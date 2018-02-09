import 'babel-polyfill'
import debug from 'debug'
import express from 'express'
import cookieParser from 'cookie-parser'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackHotServerMiddleware from 'webpack-hot-server-middleware'
import clientConfig from '../webpack/client'
import serverConfig from '../webpack/server'

const DEV = process.env.NODE_ENV !== 'production'

const log = debug('app:server')
const publicPath = clientConfig.output.publicPath // eslint-disable-line
const outputPath = clientConfig.output.path // eslint-disable-line
const app = express()

app.use(cookieParser())

app.use((req, res, next) => {
  const cookie = req.cookies.jwToken
  const jwToken = 'fake'

  if (cookie !== jwToken) {
    res.cookie('jwToken', jwToken, { maxAge: 900000 })
    req.cookies.jwToken = jwToken
  }

  next()
})

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
