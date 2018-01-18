import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

const debug = require('debug')('src:client:index');

const exec = () => {
  const store = require('src/app/store').default;
  const root = require('./root').default;
  const history = syncHistoryWithStore(browserHistory, store);
  debug('root loaded');
  root({ store, history });
};

if (document.readyState === 'complete') {
  exec();
} else {
  document.addEventListener('DOMContentLoaded', exec);
}
