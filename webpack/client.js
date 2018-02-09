const path = require('path')
const webpack = require('webpack')
const AutoDllPlugin = require('autodll-webpack-plugin')
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin')
const StatsPlugin = require('stats-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV || 'local'
const DEV = NODE_ENV !== 'production'

module.exports = {
  name: 'client',
  target: 'web',
  devtool: DEV ? 'eval' : false,
  entry: [
    'babel-polyfill',
    'fetch-everywhere',
    DEV && 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=false&quiet=false&noInfo=false',
    DEV && 'react-hot-loader/patch',
    path.resolve(__dirname, '../src/index.js'),
  ].filter(Boolean),
  output: {
    filename: DEV ? '[name].js' : '[name].[chunkhash].js',
    chunkFilename: DEV ? '[name].js' : '[name].[chunkhash].js',
    path: path.resolve(__dirname, '../build_client'),
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
        use: ExtractCssChunks.extract({
          use: {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: DEV ? '[folder]__[local]--[hash:base64:5]' : 'app__[hash:base64:5]',
            },
          },
        }),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.css'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),

    DEV && new WriteFilePlugin(), // used so you can see what chunks are produced in dev
    !DEV && new StatsPlugin('stats.json'),

    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: DEV ? '[name].js' : '[name].[chunkhash].js',
      minChunks: Infinity,
    }),

    DEV && new webpack.HotModuleReplacementPlugin(),
    DEV && new webpack.NoEmitOnErrorsPlugin(),

    !DEV && new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        screw_ie8: true,
        comments: false,
      },
      sourceMap: true,
    }),
    !DEV && new webpack.HashedModuleIdsPlugin(), // not needed for strategy to work (just good practice)

    new AutoDllPlugin({
      context: path.join(__dirname, '..'),
      filename: '[name].js',
      entry: {
        vendor: [
          'react',
          'react-dom',
          'react-redux',
          'redux',
          'history/createBrowserHistory',
          'transition-group',
          'redux-first-router',
          'redux-first-router-link',
          'fetch-everywhere',
          'babel-polyfill',
          'redux-devtools-extension/developmentOnly',
        ],
      },
      plugins: !DEV ? [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(NODE_ENV),
          },
        }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            screw_ie8: true,
            warnings: false,
          },
          mangle: {
            screw_ie8: true,
          },
          output: {
            screw_ie8: true,
            comments: false,
          },
          sourceMap: true,
        }),
      ] : [],
    }),
  ].filter(Boolean),
}
