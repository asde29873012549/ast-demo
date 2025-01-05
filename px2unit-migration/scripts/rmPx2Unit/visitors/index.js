const { isJSXAttribute } = require("@babel/types")

const { isStyledTag } = require("../utils/ast.js")
const { transformTemplate } = require("../transformers/templateTransformer.js")
const { createJSXAttributeVisitor, createJSXExpressionVisitor } = require("./jsxVisitor.js")

const createVisitors = (importCollector) => ({
  // Track Unused Imports
  ImportDeclaration(importPath) {
    importPath.traverse({
      ImportSpecifier: (specifierPath) =>
        importCollector.collectImport(specifierPath, importPath),
      ImportDefaultSpecifier: (specifierPath) =>
        importCollector.collectImport(specifierPath, importPath),
    })
  },

  JSXExpressionContainer(jsxContainerPath) {
    const isAttributeValue = isJSXAttribute(jsxContainerPath.parentPath.node)
    const jsxVisitor = isAttributeValue 
      ? createJSXAttributeVisitor(jsxContainerPath)
      : createJSXExpressionVisitor(jsxContainerPath)

    jsxContainerPath.traverse(jsxVisitor)
  },

  // Handle px2Unit calls inside styled-components
  TaggedTemplateExpression(path) {
    if (!isStyledTag(path)) return
    const templateLiteralPath = path.get("quasi")
    transformTemplate(templateLiteralPath)
  },
})

module.exports = createVisitors
