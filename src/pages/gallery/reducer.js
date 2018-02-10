import { ACTIONS } from './constants'

const {
  SET_PHOTOS,
} = ACTIONS

const initial = {
  photos: [],
}

export default (state = initial, action) => {
  switch (action.type) {
    case SET_PHOTOS:
      return {
        ...state,
        photos: action.photos,
      }
    default:
      return state
  }
}
