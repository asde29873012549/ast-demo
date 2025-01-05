const { isTemplateLiteral } = require("@babel/types")

const { isPx2UnitCall } = require("../utils/ast.js")
const transformDirectPx2UnitCall = require("../transformers/jsxTransformer.js")
const {
  transformTemplate,
  traverseExpressions,
} = require("../transformers/templateTransformer.js")

// Handle px2Unit calls inside JSXExpressionContainer that is a value of a JSXAttribute
const createJSXAttributeVisitor = (jsxContainerPath) => ({
  CallExpression: (callExprPath) => {
    // direct px2Unit call eg. width={px2Unit(10)}
    if (isPx2UnitCall(jsxContainerPath.node.expression)) {
      const [arg] = callExprPath.node.arguments
      transformDirectPx2UnitCall(jsxContainerPath, arg)
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

/**
 * Handle px2Unit calls inside other JSXExpressionContainer
 * eg.
 * <div>
 *   {data.map((item) => {
 *     const margin = px2Unit(12)
 *     const padding = `${px2Unit(item.paddingLeft)} ${px2Unit(item.paddingRight)}`
 *     return <div margin={margin} padding={padding}/>
 *   })}
 * </div>
 */
const createJSXExpressionVisitor = () => ({
  CallExpression: (callExprPath) => {
    traverseExpressions(callExprPath)
  },
})

module.exports = {
  createJSXAttributeVisitor,
  createJSXExpressionVisitor,
}