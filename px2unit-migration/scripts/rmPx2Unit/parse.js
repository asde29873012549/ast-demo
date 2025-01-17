const recast = require("recast");
const babelParser = require("@babel/parser");

const parseCodeToAST = (code) =>
  recast.parse(code, {
    parser: {
      parse(source) {
        return babelParser.parse(source, {
          sourceType: "module",
          plugins: ["jsx"],
          tokens: true,
          createParenthesizedExpressions: true,
        });
      },
    },
  });

module.exports = parseCodeToAST;
