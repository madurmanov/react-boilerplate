import debug from 'src/utils/debug'

const log = debug(__dirname)

const api = (method, params) => {
  let service = window.APP && window.APP.api

  if (__DEV__) service = require('./data').default

  if (!service) {
    log('APP.api not found')
    return Promise.reject()
  }

  return new Promise((resolve, reject) => {
    log('call: ', method, params)
    service
      .call(method, params, ({ error, response }) => {
        if (error) {
          reject(response)
        }
        log('response: ', method, response)
        return resolve(response)
      })
      .fail(err => reject(err))
  })
}

export default api
