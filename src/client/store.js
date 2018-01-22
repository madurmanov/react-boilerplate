import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import api from 'src/api'

const debug = require('debug')('src:client:store')

export default (initial, history, reducers) => {
  debug('create store')
  let middlewares = [
    thunk.withExtraArgument({ api }),
    routerMiddleware(history),
  ]

  if (__BROWSER__ && __DEV__) {
    const { createLogger } = require('redux-logger')
    middlewares = middlewares
      .concat(createLogger({
        level: 'info',
        collapsed: true,
      }))
  }

  const enhancers = [
    applyMiddleware(...middlewares),
  ]

  const composeEnhancers = process.env.NODE_ENV !== 'production'
    && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

  const store = createStore(
    reducers(),
    initial,
    composeEnhancers(...enhancers)
  )
  return store
}
