import {
  isPureLiteral,
  isPureExpression,
  createTemplateLiteral,
} from "../utils/ast.mjs";
import { stringLiteral, isUnaryExpression } from "@babel/types";

export const transformJSXContainer = (jsxContainerPath, arg) => {
  // Handle pure literals cases (numeric and string)
  // transform width={px2Unit(10)} to width="10px"
  if (isPureLiteral(arg)) {
    const { value, operator, argument } = arg;
    // Handle unary expressions
    const pxValue = isUnaryExpression(arg) ? `${operator}${argument.value}px` : `${value}px`;

    jsxContainerPath.replaceWith(stringLiteral(pxValue));
    return;
  }

  // Handle all other expressions cases
  // transform width={px2Unit(big && bigSize)} to width={`${big && bigSize}px`}
  if (isPureExpression(arg)) {
    const exprPath = jsxContainerPath.get("expression");
    exprPath.replaceWith(createTemplateLiteral(arg));
    return;
  }
};
