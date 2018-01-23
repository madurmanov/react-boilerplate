const debug = require('debug')('src:api')

const api = (method, params) => {
  let service = window.APP && window.APP.api

  if (__DEV__) service = require('./data').default

  if (!service) {
    debug('APP.api not found')
    return Promise.reject()
  }

  return new Promise((resolve, reject) => {
    debug('call: ', method, params)
    service
      .call(method, params, ({ error, response }) => {
        if (error) {
          reject(response)
        }
        debug('response: ', method, response)
        return resolve(response)
      })
      .fail(err => reject(err))
  })
}

export default api
