const path = require('path')
const webpack = require('webpack')

const NODE_ENV = process.env.NODE_ENV || 'local'
const DEV = NODE_ENV !== 'production'

module.exports = {
  name: 'client',
  target: 'web',
  devtool: DEV ? 'eval' : false,
  entry: [
    'babel-polyfill',
    'fetch-everywhere',
    DEV && 'webpack-hot-middleware/client',
    DEV && 'react-hot-loader/patch',
    path.resolve(__dirname, './source/index.js'),
  ].filter(Boolean),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/public/',
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
      source: path.resolve(__dirname, './source'),
      actions: path.resolve(__dirname, './source/actions'),
      components: path.resolve(__dirname, './source/components'),
      constants: path.resolve(__dirname, './source/constants'),
      containers: path.resolve(__dirname, './source/containers'),
      reducers: path.resolve(__dirname, './source/reducers'),
      selectors: path.resolve(__dirname, './source/selectors'),
      utils: path.resolve(__dirname, './source/utils'),
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
    DEV && new webpack.NoEmitOnErrorsPlugin(),

    !DEV && new webpack.optimize.UglifyJsPlugin(),
    !DEV && new webpack.HashedModuleIdsPlugin(),
  ].filter(Boolean),
}
