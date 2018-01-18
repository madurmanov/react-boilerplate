import { createBrowserHistory } from 'history';

const debug = require('debug')('src:client:index');

const exec = () => {
  const preloadedState = __BROWSER__ ? window.__PRELOADED_STATE__ || {} : {};
  const history = createBrowserHistory();
  const configureStore = require('src/app/store').default;
  const store = configureStore(history, preloadedState);
  const root = require('./root').default;
  debug('root loaded');
  root({ store, history });
};

if (document.readyState === 'complete') {
  exec();
} else {
  document.addEventListener('DOMContentLoaded', exec);
}
