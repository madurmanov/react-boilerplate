import createHistory from 'history/createBrowserHistory'
import configureStore from './configureStore'

const history = createHistory()
// eslint-disable-next-line
const preloadedState = window.__PRELOADED_STATE__
// need to reload client route by SSR
if (__SSR__) preloadedState.location.hasSSR = undefined

export default (routes, api) => configureStore(routes, api, history, preloadedState)
