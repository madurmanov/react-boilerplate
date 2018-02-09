import debug from 'debug'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'
import configureStore from './store'
import template from './template'
import App from '../src/components/App'

const log = debug('app:server')

const createApp = (AppComponent, store) =>
  <Provider store={store}>
    <AppComponent />
  </Provider>

export default ({ clientStats }) => async (req, res) => {
  const store = await configureStore(req, res)
  if (!store) return // no store means redirect was already served

  const app = createApp(App, store)
  const appString = ReactDOM.renderToString(app)
  const stateJson = JSON.stringify(store.getState())
  const chunkNames = flushChunkNames()
  const { js, styles, cssHash } = flushChunks(clientStats, { chunkNames })

  log('REQUESTED PATH:', req.path)
  log('CHUNK NAMES', chunkNames)

  res.send(template({
    styles,
    appString,
    cssHash,
    stateJson,
    js,
  }))
}
