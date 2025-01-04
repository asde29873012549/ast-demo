const script = require('./script.js')
const { execute, createPen } = require('./utils/general.js')
const { COMMAND_LINE_ARGS } = require('./constants.js')

const main = async () => {
  const { appliedPaths } = await script()
  if (!appliedPaths) return

  const pen = createPen()

  if (!process.argv.includes(COMMAND_LINE_ARGS.DRY_RUN)) {
    console.log(pen.green('start formatting with prettier'))
    await execute.prettier(appliedPaths)
    console.log(pen.green('start formatting with eslint'))
    await execute.eslint(appliedPaths)
  }

  console.log(pen.green('rmPx2Unit script Done'))
}

main()
