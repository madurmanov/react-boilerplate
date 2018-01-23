require('babel-polyfill')
require('babel-register')({
  presets: [
    'env',
    'react',
  ],
  plugins: [
    'react-hot-loader/babel',
    'transform-object-rest-spread',
    'transform-exponentiation-operator',
  ],
})

require('./server')
