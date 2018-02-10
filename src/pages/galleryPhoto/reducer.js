import { ACTIONS } from './constants'

const {
  SET_PHOTO,
} = ACTIONS

const initial = {
  photo: '',
}

export default (state = initial, action) => {
  switch (action.type) {
    case SET_PHOTO:
      return {
        ...state,
        photo: action.photo,
      }
    default:
      return state
  }
}
