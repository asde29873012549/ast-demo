const compiler = require("./compiler");
const fs = require("fs");
const path = require("path");
const babel = require("@babel/core");

const Config = require("../config");

const extractDirectory = (dir) => {
  if (!fs.existsSync(dir)) {
    throw new Error(`${dir} does not exist`);
  }

  return fs.readdirSync(dir).filter((subDir) => {
    const dirPath = path.join(dir, subDir);
    return fs.statSync(dirPath).isDirectory();
  });
};

const transformJSX = (code) => {
  const { code: transformedCode } = babel.transformSync(code, {
    configFile: path.resolve(__dirname, "../babel.config.js"),
  });
  return transformedCode;
};

const fixtureDir = path.resolve(__dirname, "fixtures");

beforeEach(() => {
  Config.resetConfig();
});

extractDirectory(fixtureDir).forEach((suite) => {
  describe(suite, () => {
    const suitePath = path.join(fixtureDir, suite);
    const testCases = extractDirectory(suitePath);

    testCases.forEach((testCase) => {
      it(testCase, async () => {
        const testCasePath = path.join(suitePath, testCase);

        const inputFile = path.join(testCasePath, "input.js");
        const outputFile = path.join(testCasePath, "output.js");
        const configFilePath = path.join(testCasePath, "config.json");

        // Validate the existence of input and output files
        if (!fs.existsSync(inputFile)) {
          throw new Error(`Missing input.js in test case: ${testCase}`);
        }

        if (!fs.existsSync(outputFile)) {
          throw new Error(`Missing output.js in test case: ${testCase}`);
        }

        const inputContent = fs.readFileSync(inputFile, "utf8");
        const outputContent = fs.readFileSync(outputFile, "utf8");
        const expectedOutput = transformJSX(outputContent).trim();

        // Read and parse the config file if it exists
        const config = fs.existsSync(configFilePath)
          ? JSON.parse(fs.readFileSync(configFilePath, "utf8"))
          : {};

        // Compile the input using the custom compiler
        const stats = await compiler(inputContent, config);
        const actualOutput = stats.toJson({ source: true }).modules[0].source.trim();

        expect(actualOutput).toEqual(expectedOutput);
      });
    });
  });
});
