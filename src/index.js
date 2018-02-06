import debug from 'src/utils/debug'

import render from './root'

const log = debug(__dirname)

const exec = () => {
  log('app loaded')
  render()
}

if (document.readyState === 'complete') {
  exec()
} else {
  document.addEventListener('DOMContentLoaded', exec)
}
