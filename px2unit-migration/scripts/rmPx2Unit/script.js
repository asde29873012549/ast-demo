const fs = require("fs")

const _generator = require("@babel/generator")
const { prompt } = require("enquirer")

const { DEFAULT_INCLUDE_PATHS, COMMAND_LINE_ARGS } = require("./constants.js")
const { getAbsolutePath, getAllFiles, checkDirectoriesExist, createPen } = require("./utils/general.js")
const parseCodeToAST = require("./parse.js")
const traverseAST = require("./traverse.js")


const generator = _generator.default


const script = async () => {
  const idx = process.argv.indexOf(COMMAND_LINE_ARGS.INCLUDE_PATHS)
  const providedArgPaths = idx > 0 && process.argv.slice(idx + 1).filter((arg) => arg !== COMMAND_LINE_ARGS.DRY_RUN)

  if (providedArgPaths && !checkDirectoriesExist(providedArgPaths)) {
    throw new Error("Provided paths does not exist or is not a directory")
  }

  const pen = createPen()
  const confirmMsg = `Are you sure to remove px2Unit in the following directories: ${providedArgPaths.join(', ')}?`

  const response = await prompt({
    type: 'confirm',
    name: 'confirm',
    initial: true,
    message: pen.yellow(confirmMsg),
  })

  if (!response.confirm) {
    console.log(pen.red('Aborted'))
    return
  }

  const appliedPaths = providedArgPaths || DEFAULT_INCLUDE_PATHS
  const files = appliedPaths.flatMap((path) => getAllFiles(getAbsolutePath(path)))
  const isDryRun = process.argv.includes(COMMAND_LINE_ARGS.DRY_RUN)

  files.forEach((file) => {
    const code = fs.readFileSync(file, "utf-8")
    const ast = parseCodeToAST(code)

    traverseAST(ast, code)

    const output = generator(
      ast,
      {
        retainLines: true,
        experimental_preserveFormat: true,
      },
      code,
    ).code


    if (isDryRun) {
      console.log(output)
    } else {
      fs.writeFileSync(file, output)
    }
  })

  console.log(pen.green('px2Unit removal process completed'))

  return { appliedPaths }
}

module.exports = script