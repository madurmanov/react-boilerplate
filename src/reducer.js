import { ACTIONS } from './constants'

const {
  SET_SIZES,
} = ACTIONS

const initial = {
  width: 0,
  height: 0,
}

const reducer = (state = initial, action) => {
  switch (action.type) {
    case SET_SIZES:
      return {
        ...state,
        width: action.width,
        height: action.height,
      }
    default:
      return state
  }
}

export default reducer
