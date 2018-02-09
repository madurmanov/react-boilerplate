import createHistory from 'history/createMemoryHistory'
import { NOT_FOUND } from 'redux-first-router'
import configureStore from '../src/store'

const doesRedirect = ({ kind, pathname }, res) => {
  if (kind === 'redirect') {
    res.redirect(302, pathname)
    return true
  }
  return false
}

export default async (req, res) => {
  const { jwToken } = req.cookies
  const preLoadedState = { jwToken }

  const history = createHistory({ initialEntries: [req.path] })
  const { store, thunk } = configureStore(history, preLoadedState)

  let { location } = store.getState()
  if (doesRedirect(location, res)) return false

  await thunk(store)

  location = store.getState().location // eslint-disable-line
  if (doesRedirect(location, res)) return false

  const status = location.type === NOT_FOUND ? 404 : 200
  res.status(status)

  return store
}