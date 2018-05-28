import { NOT_FOUND } from 'redux-first-router'
import { prepare } from 'utils'

const PREFIX = '@@redux-first-router'
const PAGES = prepare.constants([
  'HOME',
], PREFIX)
PAGES.NOT_FOUND = NOT_FOUND

export {
  PAGES,
  PREFIX,
}
