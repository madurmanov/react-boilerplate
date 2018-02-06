global.__BROWSER__ = false // eslint-disable-line
global.__DEV__ = true // eslint-disable-line

require('babel-polyfill')
require('babel-register')({
  presets: [require.resolve('babel-preset-madurmanov')],
})

require('./server')
