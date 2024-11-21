import { isStyledTag, isPx2UnitCall } from "../utils/ast.mjs";
import { isTemplateLiteral } from "@babel/types";
import { transformJSXContainer } from "../transformers/jsxTransformer.mjs";
import {
  transformTemplate,
  traverseExpressions,
} from "../transformers/templateTransformer.mjs";

export const createVisitors = (importCollector) => ({
  // Track Unused Imports
  ImportDeclaration(importPath) {
    importPath.traverse({
      ImportSpecifier: (specifierPath) =>
        importCollector.collectImport(specifierPath, importPath),
      ImportDefaultSpecifier: (specifierPath) =>
        importCollector.collectImport(specifierPath, importPath),
    });
  },

  // Handle px2Unit calls inside jsxExpressionContainer
  JSXExpressionContainer(jsxContainerPath) {
    jsxContainerPath.traverse({
      CallExpression: (callExprPath) => {
        // direct px2Unit call eg. width={px2Unit(10)}
        if (isPx2UnitCall(jsxContainerPath.node.expression)) {
          const [arg] = callExprPath.node.arguments;
          transformJSXContainer(jsxContainerPath, arg);
        // px2Unit call inside template literal eg. margin={`${px2Unit(10)} ${px2Unit(20)}`}
        } else if (isTemplateLiteral(jsxContainerPath.node.expression)) {
          const templateLiteralPath = jsxContainerPath.get("expression");
          transformTemplate(templateLiteralPath);
        // handle all other complex expressions
        } else {
          traverseExpressions(jsxContainerPath);
        }
      },
    });
  },

  // Handle px2Unit calls inside styled-components
  TaggedTemplateExpression(path) {
    if (!isStyledTag(path)) return;
    const templateLiteralPath = path.get("quasi");
    transformTemplate(templateLiteralPath);
  },
});
