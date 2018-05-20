import { connect } from 'react-redux'

import * as actions from './actions'
import * as selectors from './selectors'

import Component from './components'

const mapState = state => ({
  name: selectors.getName(state),
  appName: selectors.getAppName(state),
})

const mapDispatch = dispatch => ({
  changeName: value => dispatch(actions.changeName(value)),
  fetchAppName: () => dispatch(actions.fetchAppName()),
})

export default connect(mapState, mapDispatch)(Component)
