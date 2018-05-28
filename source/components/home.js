import debug from 'debug'
import React from 'react'

const log = debug('app:Home')

const Home = () => {
  log('render')

  return (
    <p>Home</p>
  )
}

export default Home
