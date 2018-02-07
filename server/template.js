const title = process.env.APP_TITLE || 'App'
const template = ({
  html = '',
  state = '',
  styles = '',
  hash = Date.now().toString(),
} = {}) => (`
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1">
    <title>${title}</title>
    <link rel="icon" href="data:;base64,=">
    <style type="text/css" id="server-side-styles">${styles}</style>
  </head>
  <body>
    <div id="app">${html}</div>
    <script id="server-side-state">${state}</script>
    <script type="text/javascript" src="/app.js?v=${hash}"></script>
  </body>
  </html>
`)

export default template
