import { ACTIONS } from './constants'

const {
  INIT,
} = ACTIONS

const initial = {
  data: {
    example: false,
  },
}

const reducer = (state = initial, action) => {
  switch (action.type) {
    case INIT:
      return {
        ...state,
        data: action.value,
      }
    default:
      return state
  }
}

export default reducer
