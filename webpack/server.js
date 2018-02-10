const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const NODE_ENV = process.env.NODE_ENV || 'local'
const DEV = NODE_ENV !== 'production'

// if you're specifying externals to leave unbundled, you need to tell Webpack
// to still bundle `react-universal-component`, `webpack-flush-chunks` and
// `require-universal-module` so that they know they are running
// within Webpack and can properly make connections to client modules:
const externals = fs
  .readdirSync(path.resolve(__dirname, '../node_modules'))
  .filter(
    x =>
      !/\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/.test(
        x
      )
  )
  .reduce((extrls, mod) => {
    extrls[mod] = `commonjs ${mod}` // eslint-disable-line
    return extrls
  }, {})

module.exports = {
  name: 'server',
  target: 'node',
  devtool: DEV ? 'eval' : false,
  entry: [
    DEV && 'babel-polyfill',
    'fetch-everywhere',
    path.resolve(__dirname, '../server/render.js'),
  ].filter(Boolean),
  externals,
  output: {
    path: path.resolve(__dirname, '../build_server'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    publicPath: '/static/',
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
        use: {
          loader: 'css-loader/locals',
          options: {
            modules: true,
            localIdentName: DEV ? '[folder]__[local]--[hash:base64:5]' : 'app__[hash:base64:5]',
          },
        },
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.css'],
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(test.js|test|md)$/),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
  ],
}
