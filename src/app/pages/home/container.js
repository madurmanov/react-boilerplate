import { connect } from 'react-redux'
import { getLocation } from 'src/app/selectors'

import * as actions from './actions'
import * as selectors from './selectors'

import Home from './components'

const mapState = state => ({
  ...selectors.getState(state),
  location: getLocation(state),
})

export default connect(mapState, actions)(Home)
