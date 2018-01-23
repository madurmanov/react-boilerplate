const path = require('path')
const webpack = require('webpack')

const json = value => JSON.stringify(value)
const NODE_ENV = process.env.NODE_ENV || 'local'
const DEV = NODE_ENV !== 'production'

module.exports = {
  devtool: DEV ? 'eval' : 'source-map',
  entry: {
    app: !DEV
      ? [path.join(__dirname, 'src/index.js')]
      : [
        'babel-polyfill',
        'webpack-hot-middleware/client',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(__dirname, 'src/index.js'),
      ],
  },
  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/static/',
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        include: path.join(__dirname, 'src'),
        loader: 'babel-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      src: path.join(__dirname, 'src'),
    },
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(test.js|test|md)$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: json(NODE_ENV),
      },
      __BROWSER__: json(true),
      __DEV__: json(DEV),
    }),
  ]
    .concat(DEV ? [
      new webpack.HotModuleReplacementPlugin(),
    ] : [])
    .concat(!DEV ? [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          drop_console: true,
          warnings: false,
        },
      }),
    ] : []),
  context: __dirname,
  node: {
    __filename: true,
    __dirname: true,
  },
}
