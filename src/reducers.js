import { NOT_FOUND } from 'redux-first-router'

const appInitial = {}
const pageInitial = { page: 'home', direction: 'next' }
const userInitial = { roles: ['member'] }
const jwTokenInitial = null

export const app = (state = appInitial, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export const page = (state = pageInitial, action) => {
  switch (action.type) {
    case 'HOME':
      return {
        ...state,
        page: 'home',
        direction: 'back',
      }
    case 'LOGIN':
      return {
        ...state,
        page: 'about',
        direction: 'back',
      }
    case 'ADMIN':
      return {
        ...state,
        page: 'about',
        direction: 'next',
      }
    case 'ABOUT':
      return {
        ...state,
        page: 'about',
        direction: 'next',
      }
    case 'GALLERY':
      return {
        ...state,
        page: 'gallery',
        direction: 'next',
      }
    case 'GALLERY_PHOTO':
      return {
        ...state,
        page: 'gallery-photo',
        direction: 'next',
      }
    case NOT_FOUND:
      return {
        ...state,
        page: 'error404',
        direction: 'back',
      }
    default:
      return state
  }
}

export const user = (state = userInitial) => state

export const jwToken = (state = jwTokenInitial, action) => {
  switch (action.type) {
    case 'TOKEN':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export { default as gallery } from './pages/gallery/reducer'
export { default as galleryPhoto } from './pages/gallery-photo/reducer'
