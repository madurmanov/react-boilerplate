import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actions from './actions'
import { getExample } from './selectors'
import Example from './components'

const mapStateToProps = state => ({
  example: getExample(state),
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Example))
