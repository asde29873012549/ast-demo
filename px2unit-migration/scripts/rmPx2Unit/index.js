const script = require('./script.js')
const { execute } = require('./utils/general')

const main = async () => {
  const { paths } = await script()
  await execute.eslint(paths)
}

main()
