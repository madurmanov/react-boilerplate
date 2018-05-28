const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = require('./config')

const NODE_ENV = process.env.NODE_ENV || 'local'
const DEV = NODE_ENV !== 'production'

module.exports = {
  mode: DEV ? 'development' : 'production',
  target: 'web',
  devtool: DEV ? 'eval' : false,
  entry: [
    'babel-polyfill',
    'fetch-everywhere',
    DEV && 'webpack-hot-middleware/client',
    DEV && 'react-hot-loader/patch',
    `${config.resolve.source}/index.js`,
  ].filter(Boolean),
  output: {
    path: config.resolve.build,
    filename: config.bundle,
    chunkFilename: config.bundle,
    publicPath: config.assets,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      source: config.resolve.source,
      actions: `${config.resolve.source}/actions`,
      components: `${config.resolve.source}/components`,
      constants: `${config.resolve.source}/constants`,
      containers: `${config.resolve.source}/containers`,
      reducers: `${config.resolve.source}/reducers`,
      selectors: `${config.resolve.source}/selectors`,
      utils: `${config.resolve.source}/utils`,
    },
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(md)$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
      __DEV__: JSON.stringify(DEV),
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),

    DEV && new webpack.HotModuleReplacementPlugin(),
    DEV && new CopyWebpackPlugin(config.copy.map(module => ({
      from: `${config.resolve.modules}/${module}`,
      to: config.resolve.build,
    }))),

    !DEV && new UglifyJsPlugin(),
    !DEV && new webpack.HashedModuleIdsPlugin(),
  ].filter(Boolean),
}
