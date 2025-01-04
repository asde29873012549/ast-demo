const createVisitors = require("./visitors/index.js")
const ImportCollector = require("./transformers/importTransformer.js")

const traverseVisitor = () => {
  const importCollector = new ImportCollector()
  const visitor = {
    Program: {
      enter(programPath) {
        programPath.traverse(createVisitors(importCollector))
      },
      exit() {
        importCollector.removeUnusedImports()
      },
    },
  }

  return {
    name: "traverseVisitor",
    visitor
  }
}

module.exports = traverseVisitor