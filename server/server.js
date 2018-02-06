const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const debug = require('debug')(`${__dirname}`)

const app = express()
const port = 3000
const template = require('./template').default

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, '../dist')))
} else {
  const config = require('../webpack.config.js')
  const compiler = webpack(config)
  app.use(webpackDevMiddleware(compiler, {
    color: true,
    hot: true,
    noInfo: true,
    historyApiFallback: true,
    publicPath: config.output.publicPath,
  }))
  app.use(webpackHotMiddleware(compiler))
}

app.use((req, res) => { res.send(template()) })

app.listen(port, (error) => {
  if (error) {
    debug(`HTTP listening error: ${error}`)
  } else {
    debug(`HTTP listening on port: ${port}!\n`)
  }
})
