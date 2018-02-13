import { PAGES } from './constants'

const {
  HOME,
  ABOUT,
  GALLERY,
  GALLERY_PHOTO,
  NOT_FOUND,
} = PAGES

const appInitial = {}
const pageInitial = { page: 'home', direction: 'next' }

export const app = (state = appInitial, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export const page = (state = pageInitial, action) => {
  switch (action.type) {
    case HOME:
      return {
        ...state,
        page: 'home',
        direction: 'back',
      }
    case ABOUT:
      return {
        ...state,
        page: 'about',
        direction: 'next',
      }
    case GALLERY:
      return {
        ...state,
        page: 'gallery',
        direction: state.page === 'gallery-photo'
          ? 'back'
          : 'next',
      }
    case GALLERY_PHOTO:
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

export { default as gallery } from './pages/gallery/reducer'
export { default as galleryPhoto } from './pages/gallery-photo/reducer'
