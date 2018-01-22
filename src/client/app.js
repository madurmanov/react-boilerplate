import { combineReducers } from 'redux'
import { createBrowserHistory } from 'history'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import configureStore from 'src/client/store'
import reducer from 'src/app/reducer'

const browserHistory = createBrowserHistory()

const debug = require('debug')('src:client:app')

const reducers = pageReducers => combineReducers({
  app: reducer,
  routing: routerReducer,
  ...pageReducers,
})

const preloadedState = __BROWSER__ ? window.__PRELOADED_STATE__ || {} : {}
const store = configureStore(preloadedState, browserHistory, reducers)
const history = syncHistoryWithStore(browserHistory, store)

export default () => {
  const root = require('./appRoot').default
  debug('root loaded')
  root(store, history)
  if (__LOC__ && module.hot) {
    module.hot.accept('./appRoot', () => {
      const nextRoot = require('./appRoot').default
      debug('next root loaded')
      nextRoot(store, history)
    })
  }
}

export { store, reducers, browserHistory }
