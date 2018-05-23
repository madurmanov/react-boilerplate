import { PREFIX, PAGES } from 'constants'

const {
  HOME,
  NOT_FOUND,
} = PAGES

const initial = 'home'

export const page = (state = initial, action) => {
  switch (action.type) {
    case HOME:
      return action.type
        .replace(`${PREFIX}/`, '')
        .toLowerCase()
    case NOT_FOUND:
      return 'error404'
    default:
      return state
  }
}
