const script = require("./script.js")
const { postprocess } = require("./utils/general")

const main = async () => {
  const { paths } = await script()
  postprocess.eslint(paths)
}

main()
