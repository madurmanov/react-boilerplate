import { ACTIONS } from './constants'

const {
  INIT,
} = ACTIONS

const init = (width, height) => ({
  type: INIT,
  width,
  height,
})

export const appInit = () => (dispatch) => {
  return dispatch(init(window.innerWidth, window.innerHeight))
}
