import { ACTIONS } from './constants'

const {
  SET_PHOTOS,
} = ACTIONS

export const setPhotos = (photos) => ({
  type: SET_PHOTOS,
  photos,
})
