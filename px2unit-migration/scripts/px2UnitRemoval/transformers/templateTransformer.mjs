import {
  isPureLiteral,
  isPureExpression,
  isPx2UnitCall,
  createTemplateLiteral,
} from "../utils/ast.mjs";
import {
  isNumericLiteral,
  isCallExpression,
  stringLiteral,
} from "@babel/types";

export const transformDirectPx2UnitCall = (
  exprPath,
  quasiPath,
  prevQuasi,
  nextQuasi,
) => {
  if (!nextQuasi) return;

  const [arg] = exprPath.node.arguments;

  if (isPureLiteral(arg)) {
    // Merge the literal value, and also merge the next quasi's value
    // prevQuasi 'font-size: '
    // nextQuasi ';\n font-weight: '
    // merged: 'font-size: 10px;\n font-weight: '
    const value = `${arg.value}px`;
    prevQuasi.value.raw += `${value}${nextQuasi.value.raw}`;
    prevQuasi.value.cooked += `${value}${nextQuasi.value.cooked}`;

    // Remove the merged nextQuasi and the expression
    quasiPath.remove();
    exprPath.remove();
  }

  // Handle dynamic expressions eg. width: ${px2Unit(size?.width)}
  if (isPureExpression(arg)) {
    exprPath.replaceWith(arg);

    // Prefix 'px' to the next quasi
    nextQuasi.value.raw = `px${nextQuasi.value.raw}`;
    nextQuasi.value.cooked = `px${nextQuasi.value.cooked}`;
  }
};

export const traverseExpressions = (expressionPath) => {
  const getReplacementNode = (arg) =>
    isNumericLiteral(arg)
      ? stringLiteral(`${arg.value}px`)
      : createTemplateLiteral(arg);

  expressionPath.traverse({
    CallExpression: (callExprPath) => {
      if (!isPx2UnitCall(callExprPath.node)) return;

      const [arg] = callExprPath.node.arguments;

      // Replace px2Unit call with either:
      // 1. A string literal with 'px' suffix for numeric values (e.g. "10px")
      // 2. A template literal for dynamic values (e.g. `${width}px`)
      callExprPath.replaceWith(getReplacementNode(arg));
    },
  });
};

export const transformTemplate = (templateLiteralPath) => {
  const { quasis, expressions } = templateLiteralPath.node;

  // Iterate through expressions in reverse to safely modify the AST
  for (let i = expressions.length - 1; i >= 0; i--) {
    const expr = expressions[i];
    const quasi = quasis[i + 1];

    const expressionPath = templateLiteralPath.get(`expressions.${i}`);
    const quasiPath = templateLiteralPath.get(`quasis.${i + 1}`);

    if (isCallExpression(expr) && isPx2UnitCall(expr)) {
      transformDirectPx2UnitCall(expressionPath, quasiPath, quasis[i], quasi);
    } else {
      traverseExpressions(expressionPath);
    }
  }
};
