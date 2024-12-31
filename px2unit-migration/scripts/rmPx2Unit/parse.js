const parser = require("@babel/parser")

const parseCodeToAST = (code) => {
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx"],
    tokens: true,
    createParenthesizedExpressions: true,
  })
  return ast
}

module.exports = parseCodeToAST
