import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import api from 'src/api';
import reducers from 'src/app/reducers';

const configureStore = (history, initialState) => {
  let middlewares = [
    thunk.withExtraArgument({ api }),
    routerMiddleware(history),
  ];

  if (__BROWSER__ && __DEV__) {
    const createLogger = require('redux-logger').createLogger;
    middlewares = middlewares
      .concat(createLogger({
        level: 'info',
        collapsed: true,
      }));
  }

  const enhancers = [
    applyMiddleware(...middlewares)
  ];

  const composeEnhancers = process.env.NODE_ENV !== 'production'
    && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  const store = createStore(
    combineReducers({
      ...reducers
    }),
    initialState,
    composeEnhancers(...enhancers),
  );
  return store;
};

export default configureStore;
