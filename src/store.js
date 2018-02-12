import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { connectRoutes } from 'redux-first-router'

import routesMap from './routes'
import options from './options'
import * as reducers from './reducers'
import * as actionCreators from './actions'

const composeEnhancers = (...args) => (
  typeof window !== 'undefined'
    ? composeWithDevTools({ actionCreators })(...args)
    : compose(...args)
)

export default (history, preLoadedState) => {
  const {
    reducer, middleware, enhancer, thunk,
  } = connectRoutes(
    history,
    routesMap,
    options,
  )

  const rootReducer = combineReducers({ ...reducers, location: reducer })
  const middlewares = [
    thunkMiddleware,
    middleware,
  ]
  const enhancers = composeEnhancers(enhancer, applyMiddleware(...middlewares))
  const store = createStore(rootReducer, preLoadedState, enhancers)

  if (module.hot && __DEV__) {
    module.hot.accept('./reducers', () => {
      const nextReducers = require('./reducers')
      const nextRootReducer = combineReducers({
        ...nextReducers,
        location: reducer,
      })
      store.replaceReducer(nextRootReducer)
    })
  }

  return { store, thunk }
}
