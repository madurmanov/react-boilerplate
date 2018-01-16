const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const debug = require('debug')('app:server:server');

const app = express();
const router = express.Router();
const port = 3000;
const config = require('../../webpack.config.js');
const compiler = webpack(config);
const template = require('./template');

app.use(webpackDevMiddleware(compiler, {
  color: true,
  publicPath: config.output.publicPath,
}));
app.use('/dist', express.static(path.join(__dirname, '../../dist')));
app.use(router);

router.get('/', (req, res) => { res.send(template()); });

app.listen(port, error => {
  if (error) {
    debug(`HTTP listening error: ${error}`);
  } else {
    debug(`HTTP listening on port: ${port}!\n`);
  }
});
