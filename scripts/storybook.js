const config = require('../config')

process.argv = process.argv.concat(
  '-p',
  config.storybookPort,
  '-c',
  'storybook',
)

require('@storybook/react/dist/server')
