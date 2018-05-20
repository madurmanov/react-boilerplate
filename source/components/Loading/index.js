import debug from 'debug'
import React from 'react'

const log = debug('app:Loading')

const Loading = () => {
  log('render')

  return <div>LOADING...</div>
}

export default Loading
