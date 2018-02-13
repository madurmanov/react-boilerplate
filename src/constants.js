import { NOT_FOUND } from 'redux-first-router'
import { prepareActions } from './utils'

const PAGES = prepareActions([
  'HOME',
  'ABOUT',
  'GALLERY',
  'GALLERY_PHOTO',
], __dirname)
PAGES.NOT_FOUND = NOT_FOUND

export { PAGES }
