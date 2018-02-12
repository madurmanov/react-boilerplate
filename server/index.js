import 'babel-polyfill'
import path from 'path'
import debug from 'debug'
import express from 'express'
import cookieParser from 'cookie-parser'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import { JSDOM } from 'jsdom'
import clientConfig from '../webpack/client'
import serverConfig from '../webpack/server'
import api from './api'

const log = debug('app:server')
const DEV = process.env.NODE_ENV !== 'production'

global.document = new JSDOM('<!doctype html><html></html>')
global.window = document.defaultView
global.__DEV__ = DEV // eslint-disable-line no-underscore-dangle

const publicPath = clientConfig.output.publicPath // eslint-disable-line prefer-destructuring
const outputPath = clientConfig.output.path // eslint-disable-line prefer-destructuring
const app = express()

app.use(cookieParser())

app.use((req, res, next) => {
  const cookie = req.cookies.token
  const token = 'fake'

  if (cookie !== token) {
    res.cookie('token', token, { maxAge: 900000 })
    req.cookies.token = token
  }

  next()
})

app.get('/api/*', async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]
  res.json(await api(req, token))
})

app.use('/local/', express.static(path.resolve(__dirname, '../local/')))

if (DEV) {
  const multiCompiler = webpack([clientConfig, serverConfig])
  const clientCompiler = multiCompiler.compilers[0]

  app.use(webpackDevMiddleware(multiCompiler, { publicPath }))
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(
    webpackHotServerMiddleware(multiCompiler, {
      serverRendererOptions: { outputPath },
    })
  )
} else {
  const clientStats = require('../build_client/stats.json') // eslint-disable-line import/no-unresolved
  const serverRender = require('../build_server/main.js').default // eslint-disable-line import/no-unresolved

  app.use(publicPath, express.static(outputPath))
  app.use(serverRender({ clientStats, outputPath }))
}

app.listen(3000, (error) => {
  if (error) {
    log(`HTTP listening error: ${error}`)
  } else {
    log('HTTP listening http://localhost:3000/')
  }
})
