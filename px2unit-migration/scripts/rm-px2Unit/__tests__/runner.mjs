// fs here has been mocked to unionfs, see setup.mjs
import * as fs from "fs";
import path from "path";

import { vol } from "./setup.mjs";
import script from "../script.mjs";

const safeParse = (json) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    return {};
  }
};

const runner = (inputDir, inputFileContent, configFile) => {
  // Reset the volume before each test to make sure each test is isolated
  vol.reset();

  const originalArgv = process.argv;
  const memDir = path.join("/memfs", inputDir);
  const memInputFilePath = path.join(memDir, "input.js");

  fs.mkdirSync(memDir, { recursive: true });
  fs.writeFileSync(memInputFilePath, inputFileContent);

  const defaultConfig = { argv: ["node", "index.mjs", "--include", memDir] };
  const config = fs.existsSync(configFile) ? safeParse(fs.readFileSync(configFile, "utf-8")) : defaultConfig;

  process.argv = config.argv;

  try {
    script();
  } finally {
    process.argv = originalArgv;
  }

  const transformedFileContent = fs.readFileSync(memInputFilePath, "utf-8");

  return transformedFileContent;
};

export default runner;