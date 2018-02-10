import { connect } from 'react-redux'

import * as selectors from './selectors'

import Component from './components'

const mapState = state => ({
  ...selectors.getState(state),
})

export default connect(mapState)(Component)
