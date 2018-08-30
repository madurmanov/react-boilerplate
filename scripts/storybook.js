const config = require('../config')

process.argv = process.argv.concat(
  '-p',
  config.ports.storybook,
  '-c',
  'storybook',
)

require('@storybook/react/dist/server')
