/* eslint-disable max-len */

export default ({ assets, bundle }) => `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>react-boilerplate-client-only</title>
  <link rel="shortcut icon" type="image/png" href="${assets}favicon.png" sizes="180x180">
  <link rel="apple-touch-icon" type="image/png" href="${assets}favicon.png" sizes="180x180">
  <link rel="stylesheet" type="text/css" href="${assets}normalize.css">
  <link rel="stylesheet" type="text/css" href="${assets}styles.css">
</head>
<body>
  <div id="root"></div>
  <script type="text/javascript">
    window.REDUX_INITIAL_STATE = {};
  </script>
  <script type="text/javascript" src="${assets}${bundle}"></script>
</body>
</html>`
