import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

import App from 'src/app/container'

const debug = require('debug')('src:client:root')

const app = (store, history) => {
  return (
    <AppContainer>
      <Provider store={store}>
        <div>
          <Router history={history}>
            <App />
          </Router>
        </div>
      </Provider>
    </AppContainer>
  )
}

const root = (store, history) => {
  debug('render')
  render(app(store, history), document.getElementById('app'))
}

export default root
