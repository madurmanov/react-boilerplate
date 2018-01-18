import { browserHistory } from 'react-router';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
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

  const applyMiddlewares = applyMiddleware(...middlewares);

  const devTools = __BROWSER__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  const composeEnhancers = __DEV__ && devTools ? devTools : compose;

  const store = createStore(
    combineReducers({
      ...reducers,
      routing: routerReducer,
    }),
    initialState,
    composeEnhancers(applyMiddlewares),
  );
  return store;
};

const preloadedState = __BROWSER__ ? window.__PRELOADED_STATE__ || {} : {}
const store = configureStore(browserHistory, preloadedState);

export default store;
