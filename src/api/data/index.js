import example from './example';

const debug = require('debug')('src:api:data:index');

const api = {
  call(method, params = {}, _cb) {
    const cb = val => {
      setTimeout(() => {
        _cb(val);
      }, (Math.random() + 1) * 750);
      return { fail: () => {} };
    };
    switch (method) {
      case 'example':
        debug('example');
        return cb(example);
      default:
        return cb({});
    }
  }
};

export default api;
