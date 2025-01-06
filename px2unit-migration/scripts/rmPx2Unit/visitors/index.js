const { isTemplateLiteral } = require("@babel/types");

const { isStyledFunction, isPx2UnitCall, getPx2UnitReplacementNode } = require("../utils/ast.js");
const { transformTemplate, traverseExpressions } = require("../transformers/templateTransformer.js");
const transformJSXDirectPx2UnitCall = require("../transformers/jsxTransformer.js");

const createVisitors = (importCollector) => ({
  // Track Unused Imports
  ImportDeclaration(importPath) {
    importPath.traverse({
      ImportSpecifier: (specifierPath) =>
        importCollector.collectImport(specifierPath, importPath),
      ImportDefaultSpecifier: (specifierPath) =>
        importCollector.collectImport(specifierPath, importPath),
    });
  },

  CallExpression(path) {
    // Handle px2Unit calls inside function call form styled-components
    if (isStyledFunction(path)) {
      const [templateLiteralPath] = path.get("arguments");
      if (!templateLiteralPath) return;

      if (isTemplateLiteral(templateLiteralPath.node)) {
        transformTemplate(templateLiteralPath);
        return;
      }

      traverseExpressions(path);
    }
    
    // Handle px2Unit calls of all other cases
    // includes:
    // 1. px2Unit call inside tagged template literal
    // 2. px2Unit call inside react component body, props or jsx expression container
    if (isPx2UnitCall(path.node)) {
      const { parentPath, node } = path;
      const [arg] = node.arguments;

      if (parentPath?.isTemplateLiteral()) {
        transformTemplate(parentPath);
        return;
      }
      if (parentPath?.isJSXExpressionContainer()) {
        transformJSXDirectPx2UnitCall(parentPath, arg);
        return;
      }

      // Replace px2Unit call with either:
      // 1. A string literal with 'px' suffix for numeric values (e.g. "10px")
      // 2. A template literal for dynamic values (e.g. `${width}px`)
      path.replaceWith(getPx2UnitReplacementNode(arg));
    }
  },
});

module.exports = createVisitors;
