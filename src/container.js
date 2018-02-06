import { connect } from 'react-redux'

import * as actions from './actions'
import * as selectors from './selectors'
import App from './components'

const mapState = (state) => {
  const { width, height } = selectors.getState(state)
  return {
    width,
    height,
  }
}

export default connect(mapState, actions)(App)
