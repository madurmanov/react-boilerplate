import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
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
  const middlewares = applyMiddleware(middleware)
  const enhancers = composeEnhancers(enhancer, middlewares)
  const store = createStore(rootReducer, preLoadedState, enhancers)

  if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('./reducers/index', () => {
      const nextReducers = require('./reducers/index')
      const nextRootReducer = combineReducers({
        ...nextReducers,
        location: reducer,
      })
      store.replaceReducer(nextRootReducer)
    })
  }

  return { store, thunk }
}
