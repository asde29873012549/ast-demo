const { isTemplateLiteral, isJSXExpressionContainer, isJSXAttribute, isVariableDeclaration } = require("@babel/types")

const { isStyledTag, isPx2UnitCall } = require("../utils/ast.js")
const transformJSXContainer = require("../transformers/jsxTransformer.js")
const {
  transformTemplate,
  traverseExpressions,
} = require("../transformers/templateTransformer.js")

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

  // Handle px2Unit calls inside JSXExpressionContainer that is a value of a JSXAttribute
  JSXAttribute(jsxAttributePath) {
    const jsxContainerPath = jsxAttributePath.get("value")
    if (!jsxContainerPath || !isJSXExpressionContainer(jsxContainerPath)) return

    jsxContainerPath.traverse({
      CallExpression: (callExprPath) => {
        // direct px2Unit call eg. width={px2Unit(10)}
        if (isPx2UnitCall(jsxContainerPath.node.expression)) {
          const [arg] = callExprPath.node.arguments
          transformJSXContainer(jsxContainerPath, arg)
        // px2Unit call inside template literal eg. margin={`${px2Unit(10)} ${px2Unit(20)}`}
        } else if (isTemplateLiteral(jsxContainerPath.node.expression)) {
          const templateLiteralPath = jsxContainerPath.get("expression")
          transformTemplate(templateLiteralPath)
        // handle all other complex expressions
        } else {
          traverseExpressions(jsxContainerPath)
        }
      },
    })
  },

  // Handle px2Unit calls inside other JSXExpressionContainer
  /* eg.
  <div>
    {data.map((item) => {
      const margin = px2Unit(12)
      const padding = `${px2Unit(item.paddingLeft)} ${px2Unit(item.paddingRight)}`
      return <div margin={margin} padding={padding}/>
    })}
  </div>
  */
  JSXExpressionContainer(jsxContainerPath) {
    if (isJSXAttribute(jsxContainerPath.parentPath.node)) return

    jsxContainerPath.traverse({
      CallExpression: (callExprPath) => {
        traverseExpressions(callExprPath)
      },
    })
  },

  // Handle px2Unit calls inside styled-components
  TaggedTemplateExpression(path) {
    if (!isStyledTag(path)) return
    const templateLiteralPath = path.get("quasi")
    transformTemplate(templateLiteralPath)
  },
})

module.exports = createVisitors
