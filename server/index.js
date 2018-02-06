require('babel-polyfill')
require('babel-register')({
  presets: "madurmanov",
})

require('./server')
