import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import AppContainer from 'react-hot-loader/lib/AppContainer'

import App from 'containers'
import configureStore from './store'

const history = createHistory()
const { store } = configureStore(history, window.REDUX_INITIAL_STATE)

const render = (Wrapper) => {
  const root = document.getElementById('root')

  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Wrapper />
      </Provider>
    </AppContainer>,
    root,
  )
}

render(App)

if (module.hot && __DEV__) {
  module.hot.accept('containers', () => {
    const NextApp = require('containers').default
    render(NextApp)
  })
}
