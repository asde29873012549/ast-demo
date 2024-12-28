import fs from "fs";
import _generator from "@babel/generator";

import { DEFAULT_INCLUDE_PATHS, COMMAND_LINE_ARGS } from "./constants.mjs";
import { getAbsolutePath, getAllFiles, checkDirectoriesExist } from "./utils/general.mjs";

import { parseCodeToAST } from "./parse.mjs";
import { traverseAST } from "./traverse.mjs";

const generator = _generator.default;

const main = () => {
  const idx = process.argv.indexOf(COMMAND_LINE_ARGS.INCLUDE_PATHS);
  const providedArgPaths = idx > 0 && process.argv.slice(idx + 1);

  if (!checkDirectoriesExist(providedArgPaths)) {
    throw new Error("Provided paths does not exist or is not a directory");
  };

  const files = (providedArgPaths || DEFAULT_INCLUDE_PATHS).flatMap((path) =>
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
