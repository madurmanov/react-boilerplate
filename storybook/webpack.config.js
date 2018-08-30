const config = require('../webpack.client.config')

module.exports = (baseConfig) => {
  const customConfig = { ...baseConfig }

  customConfig.module = config.module
  customConfig.resolve = config.resolve

  return customConfig
}
