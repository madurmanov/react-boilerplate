export default ({
  styles = '',
  appString = '',
  cssHash = '',
  stateJson = '',
  js = '',
}) => `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>App</title>
    ${styles}
  </head>
  <body>
    <div id="root">${appString}</div>
    ${cssHash}
    <script type="text/javascript">window.REDUX_STATE = ${stateJson}</script>
    <script type="text/javascript" src="/static/vendor.js"></script>
    ${js}
  </body>
</html>`
