import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import AppContainer from 'react-hot-loader/lib/AppContainer'

import configureStore from './store'
import App from './container'

const history = createHistory()
const { store } = configureStore(history, window.REDUX_STATE)

const render = (Wrapper) => {
  const root = document.getElementById('root')

  ReactDOM.hydrate(
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
  module.hot.accept('./container', () => {
    const NextApp = require('./container').default
    render(NextApp)
  })
}
