const {
  isCallExpression,
  isUnaryExpression,
} = require("@babel/types");

const {
  isPureLiteral,
  isPureExpression,
  isPx2UnitCall,
  getPx2UnitReplacementNode
} = require("../utils/ast.js");

const transformTemplatePx2UnitCall = (
  exprPath,
  quasiPath,
  prevQuasi,
  nextQuasi,
) => {
  if (!nextQuasi) return;

  const [arg] = exprPath.node.arguments;

  if (arg === undefined || arg === null) {
    // eslint-disable-next-line no-param-reassign
    prevQuasi.value.raw += `0px${nextQuasi.value.raw}`;
    // eslint-disable-next-line no-param-reassign
    prevQuasi.value.cooked += `0px${nextQuasi.value.cooked}`;

    // Remove the merged nextQuasi and the expression
    quasiPath.remove();
    exprPath.remove();
  }

  if (isPureLiteral(arg)) {
    // Merge the literal value, and also merge the next quasi's value
    // prevQuasi 'font-size: '
    // nextQuasi '\n font-weight: '
    // merged: 'font-size: 10px\n font-weight: '

    const { value, operator, argument } = arg;
    // Handle unary expressions
    const pxValue = isUnaryExpression(arg)
      ? `${operator}${argument.value}px`
      : `${value}px`;
    // eslint-disable-next-line no-param-reassign
    prevQuasi.value.raw += `${pxValue}${nextQuasi.value.raw}`;
    // eslint-disable-next-line no-param-reassign
    prevQuasi.value.cooked += `${pxValue}${nextQuasi.value.cooked}`;

    // Remove the merged nextQuasi and the expression
    quasiPath.remove();
    exprPath.remove();
  }

  // Handle dynamic expressions eg. width: ${px2Unit(size?.width)}
  if (isPureExpression(arg)) {
    exprPath.replaceWith(arg);

    // Prefix 'px' to the next quasi
    // eslint-disable-next-line no-param-reassign
    nextQuasi.value.raw = `px${nextQuasi.value.raw}`;
    // eslint-disable-next-line no-param-reassign
    nextQuasi.value.cooked = `px${nextQuasi.value.cooked}`;
  }
};

// set maxDepth to avoid stack overflow caused by mutual recursion
function traverseExpressions(expressionPath, maxDepth = 10) {
  expressionPath.traverse({
    CallExpression: (callExprPath) => {
      if (!isPx2UnitCall(callExprPath.node)) return;

      const { parentPath, node } = callExprPath;
      const [arg] = node.arguments;

      if (parentPath?.isTemplateLiteral()) {
        if (maxDepth < 0)
          throw new Error("Max depth reached in traverseExpressions call");
        transformTemplate(parentPath, maxDepth - 1);
      } else {
        // Replace px2Unit call with either:
        // 1. A string literal with 'px' suffix for numeric values (e.g. "10px")
        // 2. A template literal for dynamic values (e.g. `${width}px`)
        callExprPath.replaceWith(getPx2UnitReplacementNode(arg));
      }
    },
  });
}

// set maxDepth to avoid stack overflow caused by mutual recursion
function transformTemplate(templateLiteralPath, maxDepth = 10) {
  const { quasis, expressions } = templateLiteralPath.node;

  // Iterate through expressions in reverse to safely modify the AST
  for (let i = expressions.length - 1; i >= 0; i--) {
    const expr = expressions[i];
    const quasi = quasis[i + 1];

    const expressionPath = templateLiteralPath.get(`expressions.${i}`);
    const quasiPath = templateLiteralPath.get(`quasis.${i + 1}`);

    if (isCallExpression(expr) && isPx2UnitCall(expr)) {
      transformTemplatePx2UnitCall(expressionPath, quasiPath, quasis[i], quasi);
    } else {
      if (maxDepth < 0)
        throw new Error("Max depth reached in transformTemplate call");
      traverseExpressions(expressionPath, maxDepth - 1);
    }
  }
}

module.exports = { transformTemplate, traverseExpressions };
