import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { connectRoutes } from 'redux-first-router'

import debug from 'src/utils/debug'
import appReducer from 'src/reducer'
import options from 'src/pages/options'

const log = debug(__dirname)

const reducers = { app: appReducer }

export default (routes, api, history, preloadedState) => {
  log('create store')

  const { reducer, middleware, enhancer } = connectRoutes(
    history,
    routes,
    options
  )

  reducers.location = reducer
  const resultReducer = combineReducers({ ...reducers })

  let middlewares = [
    thunkMiddleware.withExtraArgument({ api }),
    middleware,
  ]

  if (__BROWSER__ && __DEV__) {
    const { createLogger } = require('redux-logger')
    middlewares = middlewares
      .concat(createLogger({
        level: 'info',
        collapsed: true,
      }))
  }

  // eslint-disable-next-line
  const devTools = __BROWSER__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  const composeEnhancers = __DEV__ && devTools ? devTools : compose
  const enhancers = composeEnhancers(enhancer, applyMiddleware(...middlewares))

  const store = createStore(
    resultReducer,
    preloadedState,
    enhancers
  )

  if (__DEV__ && module.hot) {
    module.hot.accept('src/reducer', () => {
      reducers.app = appReducer
      const nextResultReducer = combineReducers({ ...reducers })
      store.replaceReducer(nextResultReducer)
    })
  }

  return { store, reducers }
}
