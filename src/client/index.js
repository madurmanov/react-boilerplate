import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory} from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';

import api from 'src/api';
import reducers from 'src/app/reducers';
import App from 'src/app/components/App';

const debug = require('debug')('src:client:index');

const app = (store, history) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
);

const root = ({ store, history }) => {
  render(
    app(store, history),
    document.getElementById('app'),
  );
};

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

const exec = () => {
  const preloadedState = __BROWSER__ ? window.__PRELOADED_STATE__ || {} : {}
  const store = configureStore(browserHistory, preloadedState);
  const history = syncHistoryWithStore(browserHistory, store);
  debug('root loaded');
  root({ store, history });
};

if (document.readyState === 'complete') {
  exec();
} else {
  document.addEventListener('DOMContentLoaded', exec);
}
