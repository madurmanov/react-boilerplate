const path = require('path')
const webpack = require('webpack')
const MinifyPlugin = require('babel-minify-webpack-plugin')

const json = value => JSON.stringify(value)
const NODE_ENV = process.env.NODE_ENV || 'local'
const SSR = process.env.SSR === 'true'
const DEV = NODE_ENV !== 'production'

module.exports = {
  devtool: DEV ? 'eval' : false,
  entry: {
    app: !DEV
      ? [
        require.resolve('babel-polyfill'),
        path.join(__dirname, 'src/index.js'),
      ]
      : [
        require.resolve('babel-polyfill'),
        require.resolve('webpack-hot-middleware/client'),
        require.resolve('react-hot-loader/patch'),
        path.join(__dirname, 'src/index.js'),
      ],
  },
  output: {
    pathinfo: true,
    path: path.join(__dirname, 'dist'),
    filename: '[name].js?v=[hash]',
    chunkFilename: '[name].js?v=[hash]',
    publicPath: '/',
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.js?/,
        include: path.join(__dirname, 'src'),
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          cacheDirectory: path.join(__dirname, '.cache'),
          presets: [
            [require.resolve('babel-preset-madurmanov'), { targets: { chrome: 60 } }],
          ],
          compact: true,
        },
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
    extensions: ['.js', '.json'],
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(test.js|test|md)$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: json(NODE_ENV),
      },
      __BROWSER__: json(true),
      __SSR__: json(SSR),
      __DEV__: json(DEV),
    }),
  ]
    .concat(DEV ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ] : [])
    .concat(!DEV ? [
      new webpack.HashedModuleIdsPlugin(),
      new MinifyPlugin(),
    ] : []),
  context: __dirname,
  node: {
    __filename: true,
    __dirname: true,
  },
}
