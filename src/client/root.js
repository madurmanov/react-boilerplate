import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import App from 'src/app/container';

const app = (store, history) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/" component={App} />
      </div>
    </ConnectedRouter>
  </Provider>
);

const root = ({ store, history }) => {
  render(
    app(store, history),
    document.getElementById('app'),
  );
};

export default root;
