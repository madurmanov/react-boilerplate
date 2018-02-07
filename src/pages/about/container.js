import { connect } from 'react-redux'

import { getLocation } from 'src/selectors'

import * as actions from './actions'
import * as selectors from './selectors'

import Index from './components'

const mapState = state => ({
  ...selectors.getState(state),
  location: getLocation(state),
})

export default connect(mapState, actions)(Index)
