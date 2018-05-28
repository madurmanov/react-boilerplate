import 'babel-polyfill'
import debug from 'debug'
import express from 'express'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import api from './api'
import template from './template'
import config from '../config.js'
import webpackConfig from '../webpack.config.js'

const log = debug('app:server')
const compiler = webpack(webpackConfig)
const app = express()

app.use(bodyParser.json())

app.post(`${config.api}*`, async (req, res) => {
  res.json(await api(req.url, req.body))
})

app.use(config.assets, express.static(config.resolve.assets))

app.use(webpackDevMiddleware(compiler, { publicPath: config.assets }))
app.use(webpackHotMiddleware(compiler))

app.use((req, res) => res.send(template({
  assets: config.assets,
  bundle: config.bundle,
})))

app.listen(config.appPort, (error) => {
  if (error) {
    log(`HTTP listening error: ${error}`)
  } else {
    log(`HTTP listening http://localhost:${config.appPort}/`)
  }
})
