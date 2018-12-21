const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV || 'development'
const DEV = NODE_ENV === 'development'

const res = p => path.resolve(__dirname, p)

const nodeModules = res('./node_modules')
const entry = res('./server/render.js')
const output = res('./build_server')

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs
  .readdirSync(nodeModules)
  .filter(x => !/\.bin|react-universal-component|webpack-flush-chunks/.test(x))
  .reduce((extr, mod) => {
    extr[mod] = `commonjs ${mod}` // eslint-disable-line
    return extr
  }, {})

externals['react-dom/server'] = 'commonjs react-dom/server'

module.exports = {
  name: 'server',
  devtool: DEV ? 'inline-source-map' : 'source-map',
  target: 'node',
  mode: DEV ? 'development' : 'production',
  entry: [
    'regenerator-runtime/runtime.js',
    entry,
  ].filter(Boolean),
  externals: DEV ? externals : [],
  output: {
    path: output,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
              exportOnlyLocals: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.css'],
  },
  plugins: [
    DEV && new WriteFilePlugin(),
    !DEV && new webpack.optimize.ModuleConcatenationPlugin(),
    !DEV && new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
      __DEV__: JSON.stringify(DEV),
    }),
    !DEV && new webpack.HashedModuleIdsPlugin(),
  ].filter(Boolean),
}
