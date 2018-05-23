import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { connectRoutes } from 'redux-first-router'

import routesMap from 'source/routes'
import options from 'source/routes/options'
import * as reducers from 'reducers'
import * as actionCreators from 'actions'

const composeEnhancers = (...args) => (
  typeof window !== 'undefined'
    ? composeWithDevTools({ actionCreators })(...args)
    : compose(...args)
)

export default (history, initialState) => {
  const {
    reducer, middleware, enhancer,
  } = connectRoutes(
    history,
    routesMap,
    options,
  )

  const rootReducer = combineReducers({ ...reducers, location: reducer })
  const middlewares = [
    __DEV__ && logger,
    thunk,
    middleware,
  ].filter(Boolean)
  const enhancers = composeEnhancers(enhancer, applyMiddleware(...middlewares))
  const store = createStore(rootReducer, initialState, enhancers)

  if (module.hot && __DEV__) {
    module.hot.accept('reducers', () => {
      const nextReducers = require('reducers')
      const nextRootReducer = combineReducers({
        ...nextReducers,
        location: reducer,
      })
      store.replaceReducer(nextRootReducer)
    })
  }

  return { store, thunk }
}
