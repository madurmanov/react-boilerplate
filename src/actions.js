import { ACTIONS } from './constants'

const {
  SET_SIZES,
} = ACTIONS

const setSizes = (width, height) => ({
  type: SET_SIZES,
  width,
  height,
})

export const updateSizes = () => (dispatch) => {
  return dispatch(setSizes(window.innerWidth, window.innerHeight))
}

export const init = () => (dispatch) => {
  return dispatch(updateSizes())
}
