const path = require('path');
const webpack = require('webpack');

const str = val => JSON.stringify(val);
const NODE_ENV = process.env.NODE_ENV || 'local';
const env = {
  loc: NODE_ENV === 'local',
  dev: NODE_ENV === 'development',
  prod: NODE_ENV === 'production',
};

module.exports = {
  devtool: !env.prod ? 'eval' : 'source-map',
  entry: {
    app: !env.loc
      ? [path.join(__dirname, 'src/index.js')]
      : [
        'babel-polyfill',
        'webpack-hot-middleware/client',
        'webpack/hot/only-dev-server',
        'react-hot-loader/patch',
        path.join(__dirname, 'src/index.js')
      ],
  },
  watch: env.dev,
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
        API_HOST: str(process.env.API_HOST),
        NODE_ENV: str(NODE_ENV),
      },
      __BROWSER__: str(true),
      __DEV__: str(!env.prod),
      __LOC__: str(env.loc),
    }),
  ]
  .concat(env.loc ? [
    new webpack.HotModuleReplacementPlugin()
  ] : [])
  .concat(env.prod ? [
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
};
