import { NOT_FOUND } from 'redux-first-router'
import { prepareConstants } from 'utils'

const PREFIX = '@@redux-first-router'
const PAGES = prepareConstants([
  'HOME',
], PREFIX)
PAGES.NOT_FOUND = NOT_FOUND

export { PREFIX, PAGES }
