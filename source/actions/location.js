import { page as pageConstants } from '../constants'

const {
  PAGES,
} = pageConstants

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
