const path = require('path')

module.exports = {
  appPort: 3000,
  storybookPort: 3001,
  api: '/api/',
  assets: '/public/',
  bundle: 'app.js',
  resolve: {
    build: path.resolve(__dirname, './build'),
    modules: path.resolve(__dirname, './node_modules'),
    assets: path.resolve(__dirname, './public'),
    source: path.resolve(__dirname, './source'),
  },
  copy: [
    'normalize.css/normalize.css',
  ],
}
