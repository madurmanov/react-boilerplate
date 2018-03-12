import { TYPES, PAGES } from './constants'

const {
  HOME,
  NOT_FOUND,
} = TYPES

const initial = { page: PAGES.HOME }

export const app = (state = initial, action) => {
  switch (action.type) {
    case HOME:
      return {
        ...state,
        page: PAGES.HOME,
      }
    case NOT_FOUND:
      return {
        ...state,
        page: PAGES.ERROR404,
      }
    default:
      return state
  }
}

export { default as home } from './pages/home/reducer'
