import debug from 'debug'

import getAppName from './getAppName'

const log = debug('app:server:api')

const fakeDelay = (ms = (Math.random() * 1000)) => (
  new Promise(res => setTimeout(res, ms))
)

const response = (data) => ({
  error: '',
  data,
})

export default async (url, params = {}) => {
  await fakeDelay()
  log(url, params)
  switch (url) {
    case '/api/getAppName':
      return response(getAppName)
    default:
      return []
  }
}
