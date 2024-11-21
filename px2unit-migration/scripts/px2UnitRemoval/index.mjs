import fs from "fs";
import _generator from "@babel/generator";

import { INCLUDE_PATHS } from "./constants.mjs";
import { getAbsolutePath, getAllFiles } from "./utils/general.mjs";

import { parseCodeToAST } from "./parse.mjs";
import { traverseAST } from "./traverse.mjs";

const generator = _generator.default;

const main = () => {
  const files = INCLUDE_PATHS.flatMap((path) =>
    getAllFiles(getAbsolutePath(path)),
  );

  const isDryRun = process.argv.includes("--dry-run");

  files.forEach((file) => {
    const code = fs.readFileSync(file, "utf-8");
    const ast = parseCodeToAST(code);

    traverseAST(ast, code);

    const output = generator(ast).code;

    if (isDryRun) {
      console.log(output);
    } else {
      fs.writeFileSync(file, output);
    }
  });
};

main();
