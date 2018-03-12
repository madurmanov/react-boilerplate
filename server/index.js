import 'babel-polyfill'
import debug from 'debug'
import express from 'express'
import bodyParser from 'body-parser'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import api from './api'
import template from './template'
import webpackConfig from '../webpack.config.js'

const log = debug('app:server')
const compiler = webpack(webpackConfig)
const { publicPath } = webpackConfig.output
const app = express()

app.use(bodyParser.json())

app.post('/api/*', async (req, res) => {
  res.json(await api(req.url, req.body))
})

app.use(webpackDevMiddleware(compiler, { publicPath }))
app.use(webpackHotMiddleware(compiler))

app.use((req, res) => res.send(template()))

app.listen(3000, (error) => {
  if (error) {
    log(`HTTP listening error: ${error}`)
  } else {
    log('HTTP listening http://localhost:3000/')
  }
})
