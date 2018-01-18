const path = require('path');
const webpack = require('webpack');

const SRC_DIR = path.join(__dirname, 'src');
const DIST_DIR = path.join(__dirname, 'dist');

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
      ? [SRC_DIR + '/index.js']
      : [
        'babel-polyfill',
        SRC_DIR + '/index.js'
      ],
  },
  watch: env.dev,
  output: {
    filename: 'app.js',
    path: DIST_DIR,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        include: SRC_DIR,
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
      src: SRC_DIR,
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
