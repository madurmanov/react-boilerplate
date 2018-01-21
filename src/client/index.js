const debug = require('debug')('src:client:index')

const exec = () => {
  const app = require('./app').default
  debug('app loaded')
  app()
}

if (document.readyState === 'complete') {
  exec()
} else {
  document.addEventListener('DOMContentLoaded', exec)
}
