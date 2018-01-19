import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader'

import App from 'src/app/container'

const app = (store, history) => (
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route path="/" component={App} />
        </div>
      </ConnectedRouter>
    </Provider>
  </AppContainer>
)

const root = ({ store, history }) => {
  render(
    app(store, history),
    document.getElementById('app')
  )
}

export default root
