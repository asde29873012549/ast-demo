const recast = require("recast")
const babelParser = require("@babel/parser")

const parseCodeToAST = (code) => {
  return recast.parse(code, {
    parser: {
      parse(source) {
        return babelParser.parse(source, {
          sourceType: "module",
          plugins: ["jsx"],
          tokens: true,
        })
      }
    }
  })
}

module.exports = parseCodeToAST