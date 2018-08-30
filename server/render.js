import debug from 'debug'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import App from '../source/containers'
import configureStore from './store'
import template from './template'

const log = debug('app:server:render')

export default ({ clientStats }) => async (req, res) => {
  const store = await configureStore(req, res)
  if (!store) return
  const app = ReactDOM.renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  )
  const stateJson = JSON.stringify(store.getState())
  const chunkNames = flushChunkNames()

  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames })

  log(`PATH: ${req.path}`)

  res.send(
    template({
      styles,
      app,
      state: stateJson,
      chunks: cssHash,
      js,
    })
  )
}
