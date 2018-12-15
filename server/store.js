import { NOT_FOUND } from 'redux-first-router'
import configureStore from '../source/store'

const doesRedirect = ({ kind, pathname }, res) => {
  if (kind === 'redirect') {
    res.redirect(302, pathname)
    return true
  }
  return false
}

export default async (req, res) => {
  const preLoadedState = {}

  const { store, thunk } = configureStore(preLoadedState, [req.path])

  const locationStart = store.getState().location
  if (doesRedirect(locationStart, res)) return false

  await thunk(store)

  const locationEnd = store.getState().location
  if (doesRedirect(locationEnd, res)) return false

  const status = locationEnd.type === NOT_FOUND ? 404 : 200
  res.status(status)
  return store
}
