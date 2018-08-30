const debug = require('debug')
const path = require('path')
const express = require('express')
const expressNoFavicon = require('express-no-favicons')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
const webpackClientConfig = require('../webpack.client.config')
const webpackServerConfig = require('../webpack.server.config')

const log = debug('app:server')
const { publicPath } = webpackClientConfig.output
const outputPath = webpackClientConfig.output.path
const DEV = process.env.NODE_ENV === 'development'
const app = express()

app.use(expressNoFavicon())

app.use(publicPath, express.static(path.resolve(__dirname, '../public')))

let isBuilt = false

const done = () => !isBuilt
  && app.listen(3000, () => {
    isBuilt = true
    log('BUILD COMPLETE -- Listening @ http://localhost:3000')
  })

if (DEV) {
  const compiler = webpack([webpackClientConfig, webpackServerConfig])
  const clientCompiler = compiler.compilers[0]
  const options = { publicPath, stats: { colors: true } }
  const devMiddleware = webpackDevMiddleware(compiler, options)

  app.use(devMiddleware)
  app.use(webpackHotMiddleware(clientCompiler))
  app.use(webpackHotServerMiddleware(compiler))

  devMiddleware.waitUntilValid(done)
} else {
  webpack([webpackClientConfig, webpackServerConfig]).run((err, stats) => {
    const clientStats = stats.toJson().children[0]
    const serverRender = require('../build_server/main.js').default

    app.use(publicPath, express.static(outputPath))
    app.use(serverRender({ clientStats }))

    done()
  })
}
