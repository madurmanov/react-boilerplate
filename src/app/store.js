import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import api from 'src/api'
import history from 'src/utils/history'
import reducers from 'src/app/reducers'

const configureStore = initialState => {
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
    initialState,
    composeEnhancers(...enhancers)
  )
  store.asyncReducers = {}
  return store
}

const preloadedState = __BROWSER__ ? window.__PRELOADED_STATE__ || {} : {}
const store = configureStore(preloadedState)

export const injectAsyncReducer = (name, asyncReducer) => {
  store.asyncReducers[name] = asyncReducer
  store.replaceReducer(reducers(store.asyncReducers))
}

export default store
