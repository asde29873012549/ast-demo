import * as fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

import runner from "./runner.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const extractDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    throw new Error(`${dir} does not exist`);
  }

  return fs.readdirSync(dir).filter((subDir) => {
    const dirPath = path.join(dir, subDir);
    return fs.statSync(dirPath).isDirectory();
  });
};

const format = (str) => {
  return str.replace(/[^\S\r\n]+/g, "").trim();
}

const fixtureDir = path.resolve(__dirname, "fixtures");

extractDirectory(fixtureDir).forEach((suite) => {
  describe(suite, () => {
    const suitePath = path.join(fixtureDir, suite);
    const testCases = extractDirectory(suitePath);

    testCases.forEach((testCase) => {
      it(testCase, async () => {
        const testCasePath = path.join(suitePath, testCase);

        const inputFile = path.join(testCasePath, "input.js");
        const outputFile = path.join(testCasePath, "output.js");
        const configFile = path.join(testCasePath, "config.json");
        // Validate the existence of input and output files
        if (!fs.existsSync(inputFile)) {
          throw new Error(`Missing input.js in test case: ${testCase}`);
        }

        if (!fs.existsSync(outputFile)) {
          throw new Error(`Missing output.js in test case: ${testCase}`);
        }

        const inputContent = fs.readFileSync(inputFile, "utf8");
        const outputContent = fs.readFileSync(outputFile, "utf8");

        const inputDirectory = path.relative(__dirname, testCasePath);
        const transformedFileContent = runner(inputDirectory, inputContent, configFile);

        expect(format(transformedFileContent)).toEqual(format(outputContent));
      });
    });
  });
});
