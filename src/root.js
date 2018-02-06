import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import api from './api'
import getStore from './store'
import getPage from './app/pages'
import routes from './app/pages/routes'
import App from './app/container'

const render = (Wrapper, Page, store) => {
  const root = document.getElementById('app')
  const js = document.getElementById('server-side-state')
  const css = document.getElementById('server-side-styles')
  const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
  renderMethod(
    <AppContainer>
      <Provider store={store}>
        <Wrapper>
          <Page />
        </Wrapper>
      </Provider>
    </AppContainer>,
    root,
    () => {
      if (js) js.remove()
      if (css) css.remove()
    }
  )
}

export default () => {
  const { store, reducers } = getStore({ ...routes }, api)
  const Page = getPage({ store, reducers })
  render(App, Page, store)

  if (__DEV__ && module.hot) {
    module.hot.accept('./app/pages', () => {
      const getNextPage = require('./app/pages').default
      const NextPage = getNextPage({ store, reducers })
      render(App, NextPage, store)
    })
  }
}
