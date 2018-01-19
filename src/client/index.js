import history from 'src/utils/history';

const debug = require('debug')('src:client:index');

const exec = () => {
  const store = require('src/app/store').default;
  const root = require('./root').default;
  debug('root loaded');
  root({ store, history });
};

if (document.readyState === 'complete') {
  exec();
} else {
  document.addEventListener('DOMContentLoaded', exec);
}
