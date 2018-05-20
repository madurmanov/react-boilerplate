import debug from 'debug'
import React from 'react'

const log = debug('app:Error')

const Error = error => {
  log('render')

  return <div>ERROR: {error.error}</div>
}

export default Error
