import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import { render } from './render'

const SSR = process.env.SSR === 'true'

const debug = require('debug')('app:server')

const html = render(SSR)
const handler = (req, res) => { res.send(html) }

const app = express()
const port = 3000

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../dist')))
} else {
  const config = require('../webpack.config.js')
  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, {
    color: true,
    hot: true,
    noInfo: true,
    publicPath: config.output.publicPath,
  }))
  app.use(webpackHotMiddleware(compiler))
}

app.use(handler)

app.listen(port, (error) => {
  if (error) {
    debug(`HTTP listening error: ${error}`)
  } else {
    debug(`HTTP listening on port: ${port}!\n`)
  }
})
