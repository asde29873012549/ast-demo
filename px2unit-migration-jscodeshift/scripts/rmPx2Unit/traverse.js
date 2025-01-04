const createVisitors = require("./visitors/index.js")
const ImportCollector = require("./transformers/importTransformer.js")

const getTraverseVisitors = () => {
  const importCollector = new ImportCollector()

  const visitors = createVisitors(importCollector)

  return {
    name: "remove-px2Unit",
    visitor: {
      Program: {
        enter(programPath) {
          programPath.traverse(visitors)
  
        },
        exit() {
          importCollector.removeUnusedImports()
  
        },
      },
    }
  }
}

module.exports = getTraverseVisitors