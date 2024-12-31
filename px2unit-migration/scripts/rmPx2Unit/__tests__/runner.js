const fs = require("fs")
const path = require("path")

const script = require("../script.js")

const { vol } = require("./setup.js")

const safeParse = (json) => {
  try {
    return JSON.parse(json)
  } catch (e) {
    return {}
  }
}

const runner = async (inputDir, inputFileContent, configFile) => {
  // reset memfs before each test to avoid side effects
  vol.reset()

  const originalArgv = process.argv
  const memDir = path.join("/memfs", inputDir)
  const memInputFilePath = path.join(memDir, "input.js")

  fs.mkdirSync(memDir, { recursive: true })
  fs.writeFileSync(memInputFilePath, inputFileContent)

  const defaultConfig = { argv: ["node", "index.mjs", "--include", memDir] }
  const config = fs.existsSync(configFile) ? safeParse(fs.readFileSync(configFile, "utf-8")) : defaultConfig

  process.argv = config.argv

  try {
    await script()
  } finally {
    process.argv = originalArgv
  }

  const transformedFileContent = fs.readFileSync(memInputFilePath, "utf-8")

  return transformedFileContent
}

module.exports = runner