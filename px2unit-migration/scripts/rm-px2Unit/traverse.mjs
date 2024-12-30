import _traverse from "@babel/traverse";
import { createVisitors } from "./visitors/index.mjs";
import { ImportCollector } from "./transformers/importTransformer.mjs";

const traverse = _traverse.default;

export const traverseAST = (ast) => {
  const importCollector = new ImportCollector();
  const visitors = createVisitors(importCollector);

  traverse(ast, {
    Program: {
      enter(programPath) {
        programPath.traverse(visitors);
      },
      exit() {
        importCollector.removeUnusedImports();
      },
    },
  });
};
