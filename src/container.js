import { connect } from 'react-redux'

import * as actions from './actions'
import * as selectors from './selectors'
import Index from './components'

const mapState = state => ({
  ...selectors.getState(state),
})

export default connect(mapState, actions)(Index)
