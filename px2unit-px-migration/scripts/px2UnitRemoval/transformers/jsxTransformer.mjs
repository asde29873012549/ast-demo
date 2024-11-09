import {
  isPureLiteral,
  isPureExpression,
  createTemplateLiteral,
} from "../utils/ast.mjs";
import { stringLiteral } from "@babel/types";

export const transformJSXContainer = (jsxContainerPath, arg) => {
  // Handle pure literals cases (numeric and string)
  // transform width={px2Unit(10)} to width="10px"
  if (isPureLiteral(arg)) {
    jsxContainerPath.replaceWith(stringLiteral(`${arg.value}px`));
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
