import { PAGES } from './constants'

const {
  HOME,
  NOT_FOUND,
} = PAGES

const appInitial = {}

export const app = (state = appInitial, action) => {
  switch (action.type) {
    default:
      return state
  }
}

const pageInitial = 'home'

export const page = (state = pageInitial, action) => {
  switch (action.type) {
    case HOME:
      return 'home'
    case NOT_FOUND:
      return 'error404'
    default:
      return state
  }
}

export { default as home } from './pages/home/reducer'
