const script = require("./script.js")
const { execute, createPen } = require("./utils/general.js")
const { COMMAND_LINE_ARGS } = require("./constants.js")

const { appliedPaths } = await script()

const pen = createPen()

if (!process.argv.includes(COMMAND_LINE_ARGS.DRY_RUN)) {
  console.log(pen.green('start formatting with prettier'))
  execute.prettier(appliedPaths)
  console.log(pen.green('start formatting with eslint'))
  execute.eslint(appliedPaths)
}

console.log(pen.green('rmPx2Unit script Done'))