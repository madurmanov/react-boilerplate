import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './container';
import Example from './example/container';

const routes = () => (
  <Route path="/" component={App}>
    <IndexRoute component={Example} />
  </Route>
);

export default routes;
