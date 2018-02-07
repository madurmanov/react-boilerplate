import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import debug from 'src/utils/debug'

import api from './api'
import getStore from './store'
import App from './container'
import { init } from './actions'
import getPage from './pages'
import routes from './pages/routes'

const log = debug(__dirname)

const render = (Wrapper, Page, store) => {
  const root = document.getElementById('app')
  const js = document.getElementById('server-side-state')
  const css = document.getElementById('server-side-styles')
  const renderMethod = __SSR__ ? ReactDOM.hydrate : ReactDOM.render
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

const app = () => {
  const { store, reducers } = getStore({ ...routes }, api)
  store.dispatch(init())

  log('page loaded')
  const Page = getPage({ store, reducers })
  render(App, Page, store)

  if (__DEV__ && module.hot) {
    module.hot.accept('./pages', () => {
      log('next page loaded')
      const getNextPage = require('./pages').default
      const NextPage = getNextPage({ store, reducers })
      render(App, NextPage, store)
    })
  }
}

const exec = () => {
  log('app loaded')
  app()
}

if (document.readyState === 'complete') {
  exec()
} else {
  document.addEventListener('DOMContentLoaded', exec)
}
