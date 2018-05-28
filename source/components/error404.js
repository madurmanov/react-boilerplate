import debug from 'debug'
import React from 'react'

const log = debug('app:Error404')

const Error404 = () => {
  log('render')

  return (
    <p>Error404</p>
  )
}

export default Error404
