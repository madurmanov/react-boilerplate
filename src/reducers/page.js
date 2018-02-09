import { NOT_FOUND } from 'redux-first-router'

const components = {
  HOME: 'Home',
  ABOUT: 'About',
  GALLERY: 'Gallery',
  ADMIN: 'Admin',
  LOGIN: 'Login',
  [NOT_FOUND]: 'NotFound',
}

export default (state = 'HOME', action = {}) => components[action.type] || state
