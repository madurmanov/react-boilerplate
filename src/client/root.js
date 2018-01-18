import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import routes from 'src/app/routes';

const app = (store, history) => (
  <Provider store={store}>
    <Router routes={routes(store)} history={history} />
  </Provider>
);

const root = ({ store, history }) => {
  render(
    app(store, history),
    document.getElementById('app'),
  );
};

export default root;
