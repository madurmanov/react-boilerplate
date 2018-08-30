import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import loggerMiddleware from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { connectRoutes } from 'redux-first-router'
import routes from '../routes'
import options from '../routes/options'
import * as reducers from '../reducers'
import * as actions from '../actions'

const composeEnhancers = (...args) => (
  typeof window !== 'undefined'
    ? composeWithDevTools({ actions })(...args)
    : compose(...args)
)

export default (history, initialState) => {
  const {
    reducer, middleware, enhancer, thunk,
  } = connectRoutes(
    history,
    routes,
    options,
  )

  const rootReducer = combineReducers({
    ...reducers,
    location: reducer,
  })
  const middlewares = [
    __DEV__ && loggerMiddleware,
    thunkMiddleware,
    middleware,
  ].filter(Boolean)
  const enhancers = composeEnhancers(enhancer, applyMiddleware(...middlewares))
  const store = createStore(rootReducer, initialState, enhancers)

  if (module.hot && __DEV__) {
    module.hot.accept('./../reducers', () => {
      const nextReducers = require('./../reducers')
      const nextRootReducer = combineReducers({
        ...nextReducers,
        location: reducer,
      })
      store.replaceReducer(nextRootReducer)
    })
  }

  return { store, thunk }
}
