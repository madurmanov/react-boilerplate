import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import { JssProvider, SheetsRegistry } from 'react-jss'

import createHistory from 'history/createMemoryHistory'
import csso from 'csso'

import App from '../src/container'
import routes from '../src/pages/routes'
import configureStore from '../src/store/configureStore'
import Loading from '../src/components/loading'
import tmpl from './template'

const history = createHistory({ initialEntries: ['/'] })

export const render = (ssr) => {
  let html = ''
  let styles = ''
  let state = ''
  if (ssr) {
    const { store } = configureStore(routes, {}, history)

    const sheets = new SheetsRegistry()
    html = renderToString(
      <AppContainer>
        <Provider store={store}>
          <JssProvider registry={sheets}>
            <App>
              <Loading />
            </App>
          </JssProvider>
        </Provider>
      </AppContainer>
    )
    const { css } = csso.minify(sheets.toString())
    styles = css
    const stateData = JSON.stringify(store.getState())
    state = `window.__PRELOADED_STATE__ = ${stateData.replace(/</g, '\\x3c')}`
  }

  return tmpl({ html, styles, state })
}
