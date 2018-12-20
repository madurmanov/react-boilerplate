const path = require('path')
const webpack = require('webpack')
const WriteFilePlugin = require('write-file-webpack-plugin')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const config = require('./config')

const NODE_ENV = process.env.NODE_ENV || 'development'
const DEV = NODE_ENV === 'development'

module.exports = {
  name: 'client',
  target: 'web',
  devtool: DEV ? 'inline-source-map' : 'source-map',
  mode: DEV ? 'development' : 'production',
  entry: [
    DEV && 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    DEV && 'react-hot-loader/patch',
    'regenerator-runtime/runtime.js',
    path.resolve(__dirname, './source/index.js'),
  ].filter(Boolean),
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, './build_client'),
    publicPath: '/static/',
  },
  stats: DEV ? 'none' : 'verbose',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          ExtractCssChunks.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
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
    new ExtractCssChunks(),
    DEV && new webpack.HotModuleReplacementPlugin(),
    DEV && new webpack.NoEmitOnErrorsPlugin(),
    !DEV && new webpack.optimize.ModuleConcatenationPlugin(),
    !DEV && new webpack.optimize.OccurrenceOrderPlugin(),
    new CopyWebpackPlugin(config.copy.map(module => ({
      from: path.resolve(__dirname, `./node_modules/${module}`),
      to: path.resolve(__dirname, './build_client'),
    }))),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
      __DEV__: JSON.stringify(DEV),
    }),
    !DEV && new webpack.HashedModuleIdsPlugin(),
  ].filter(Boolean),
}
