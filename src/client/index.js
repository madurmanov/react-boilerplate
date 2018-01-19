import history from 'src/utils/history'

const debug = require('debug')('src:client:index')

const exec = () => {
  const store = require('src/app/store').default
  const app = require('./app').default
  debug('app loaded')
  app({ store, history })
  if (__LOC__ && module.hot) {
    module.hot.accept('./app', () => {
      const nextApp = require('./app').default
      debug('next app loaded')
      nextApp({ store, history })
    })
  }
}

if (document.readyState === 'complete') {
  exec()
} else {
  document.addEventListener('DOMContentLoaded', exec)
}
