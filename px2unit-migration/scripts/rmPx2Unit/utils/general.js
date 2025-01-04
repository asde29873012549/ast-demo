const fs = require("fs")
const path = require("path")
const { spawn } = require("child_process")

const { AVAILABLE_EXTENSIONS, ANSI_PALETTE } = require("../constants.js")

const isDirectory = (filePath) => fs.statSync(filePath).isDirectory()

// filter hidden files
const filterInvalidFiles = (files) =>
  files.filter((file) => !file.startsWith(".") && !file.startsWith("_"))

const getSubDirectoriesFromFilePath = (filePath) =>
  filterInvalidFiles(fs.readdirSync(filePath))

const getAbsolutePath = (relativePath) => path.resolve(process.cwd(), relativePath)

const getAllFiles = (basePath) => {
  const filePaths = []

  const recursiveScan = (currentPath) => {
    const directoryList = getSubDirectoriesFromFilePath(currentPath)

    directoryList.forEach((item) => {
      const itemPath = path.join(currentPath, item)

      if (isDirectory(itemPath)) {
        recursiveScan(itemPath)
      } else if (AVAILABLE_EXTENSIONS.some((ext) => item.endsWith(ext))) {
        filePaths.push(itemPath)
      }
    })
  }

  recursiveScan(basePath)

  return filePaths
}

const checkDirectoriesExist = (paths) => {
  if (!paths || paths.length === 0) return false

  return paths.every((path) => {
    const absolutePath = getAbsolutePath(path)
    return fs.existsSync(absolutePath) && isDirectory(absolutePath)
  })
}

const createPen = () => ({
  yellow: (text) => `${ANSI_PALETTE.YELLOW}${text}${ANSI_PALETTE.RESET}`,
  green: (text) => `${ANSI_PALETTE.GREEN}${text}${ANSI_PALETTE.RESET}`,
  red: (text) => `${ANSI_PALETTE.RED}${text}${ANSI_PALETTE.RESET}`,
})

const postprocess = (paths) => {
  return {
    eslint() {
      const pen = createPen()

      console.log(pen.green('eslint started formatting'))

      const eslintArgs = ['eslint', '--fix', ...paths.map((path) => `"${path}/**/*"`)]
      spawn('npx', eslintArgs, {
        stdio: 'inherit',
        env: {
          ...process.env,
          CI: 'true',
        },
        shell: true,
      }).on('close', (code) => {
        if (code === 0) {
          console.log(pen.green('eslint finished formatting'))
        } else {
          console.log(pen.red(`eslint process exited with code ${code}`))
        }
      })
    }
  }
}

module.exports = {
  getAbsolutePath,
  getAllFiles,
  checkDirectoriesExist,
  createPen,
  postprocess,
}
