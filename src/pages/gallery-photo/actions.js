import { ACTIONS } from './constants'

const {
  SET_PHOTO,
} = ACTIONS

export const setPhoto = (photo) => ({
  type: SET_PHOTO,
  photo,
})
