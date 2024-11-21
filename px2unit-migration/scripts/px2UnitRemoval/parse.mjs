import parser from "@babel/parser";

export const parseCodeToAST = (code) => {
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx"],
  });
  return ast;
};
