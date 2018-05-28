import { page as pageConstants } from 'constants'

const {
  PAGES,
} = pageConstants

const {
  HOME,
  NOT_FOUND,
} = PAGES

const initial = 'home'

export default (state = initial, action) => {
  switch (action.type) {
    case HOME:
      return 'home'
    case NOT_FOUND:
      return 'error404'
    default:
      return state
  }
}
