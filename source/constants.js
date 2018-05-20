import { NOT_FOUND } from 'redux-first-router'
import { prepareConstants } from './utils'

const PAGES = prepareConstants([
  'HOME',
], '@@redux-first-router')
PAGES.NOT_FOUND = NOT_FOUND

export { PAGES }
