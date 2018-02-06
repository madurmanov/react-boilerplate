import render from './root'

const debug = require('debug')(`${__dirname}`)

const exec = () => {
  debug('app loaded')
  render()
}

if (document.readyState === 'complete') {
  exec()
} else {
  document.addEventListener('DOMContentLoaded', exec)
}
