import { redirect } from 'redux-first-router'
import { isAllowed, isServer } from './utils'

export default {
  onBeforeChange: (dispatch, getState, action) => {
    const allowed = isAllowed(action.type, getState())

    if (!allowed) {
      dispatch(redirect({ type: 'LOGIN' }))
    }
  },
  onAfterChange: (dispatch, getState) => {
    const { type } = getState().location

    if (type === 'LOGIN' && !isServer) {
      alert('LOGIN') // eslint-disable-line
    }
  },
}
