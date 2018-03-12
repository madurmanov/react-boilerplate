import { ACTIONS } from './constants'

const {
  CHANGE_NAME,
  CHANGE_APP_NAME,
} = ACTIONS

const initial = {
  name: '',
  appName: '',
}

export default (state = initial, action) => {
  switch (action.type) {
    case CHANGE_NAME:
      return {
        ...state,
        name: action.value,
      }
    case CHANGE_APP_NAME:
      return {
        ...state,
        appName: action.value,
      }
    default:
      return state
  }
}
