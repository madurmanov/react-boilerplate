import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { AppContainer } from 'react-hot-loader'
import App from './containers'
import configureStore from './store'

const history = createHistory()
const { store } = configureStore(history, window.REDUX_INITIAL_STATE)

const render = Wrapper => ReactDOM.hydrate(
  <AppContainer>
    <Provider store={store}>
      <Wrapper />
    </Provider>
  </AppContainer>,
  document.getElementById('root')
)

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./containers', () => {
    const HotApp = require('./containers').default
    render(HotApp)
  })
}

render(App)
