const _traverse = require("@babel/traverse")

const createVisitors = require("./visitors/index.js")
const ImportCollector = require("./transformers/importTransformer.js")

const traverse = _traverse.default

const traverseAST = (ast) => {
  const importCollector = new ImportCollector()

  const visitors = createVisitors(importCollector)


  traverse(ast, {
    Program: {
      enter(programPath) {
        programPath.traverse(visitors)

      },
      exit() {
        importCollector.removeUnusedImports()

      },
    },
  })

}

module.exports = traverseAST