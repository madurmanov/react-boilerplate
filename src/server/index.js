const NODE_ENV = process.env.NODE_ENV || 'local'

global.__BROWSER__ = false
global.__DEV__ = NODE_ENV !== 'production'
global.__LOC__ = NODE_ENV === 'local'

require('babel-polyfill')
require('babel-register')({
  presets: [
    'env',
    'react',
  ],
  plugins: [
    'transform-object-rest-spread',
    'transform-exponentiation-operator',
  ],
})

require('./server')
