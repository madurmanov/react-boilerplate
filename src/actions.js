import { PAGES } from './constants'

const {
  HOME,
  NOT_FOUND,
} = PAGES

export const goTo = (type, payload, query) => ({
  type,
  payload,
  query,
})

export const goToHome = () => ({
  type: HOME,
})

export const goToNotFound = () => ({
  type: NOT_FOUND,
})
