const debug = require('debug')('src:api:index');

const api = (method, params) => {
  let apiService = window.APP && window.APP.api;

  if (__DEV__) {
    apiService = require('./data').default;
  }

  if (!apiService) {
    debug('APP.api not found');
    return Promise.reject();
  }

  return new Promise((resolve, reject) => {
    debug('call: ', method, params);
    apiService
      .call(method, params, (result) => {
        if (result.error) {
          reject(result.error);
        }
        debug('response: ', method, result);
        return resolve(result);
      })
      .fail(err => reject(err));
  });
};

export default api;
