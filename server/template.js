/* eslint-disable max-len */

export default ({
  styles,
  app,
  state,
  chunks,
  js,
}) => `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>react-universal-component-boilerplate</title>
    <link rel="shortcut icon" type="image/png" href="/static/favicon.png" sizes="180x180">
    <link rel="apple-touch-icon" type="image/png" href="/static/favicon.png" sizes="180x180">
    <link rel="stylesheet" href="/static/styles.css">
    ${styles}
  </head>
  <body>
    <div id="root">${app}</div>
    <script type="text/javascript">
      window.REDUX_INITIAL_STATE = ${state};
    </script>
    ${chunks}
    ${js}
  </body>
</html>
`
