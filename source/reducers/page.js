import { page as pageConstants } from '../constants'

const {
  PAGES,
} = pageConstants

const {
  HOME,
  ABOUT,
  NOT_FOUND,
} = PAGES

const initial = ''

export default (state = initial, action) => {
  switch (action.type) {
    case HOME:
      return 'Home'
    case ABOUT:
      return 'About'
    case NOT_FOUND:
      return 'Error404'
    default:
      return state
  }
}
