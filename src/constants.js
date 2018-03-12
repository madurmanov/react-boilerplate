import { NOT_FOUND } from 'redux-first-router'
import { prepareActions } from './utils'

const TYPES = prepareActions([
  'HOME',
], __dirname)
TYPES.NOT_FOUND = NOT_FOUND

const PAGES = {
  HOME: 'home',
  ERROR404: 'error404',
}

export { TYPES, PAGES }
