import { connect } from 'react-redux'

import * as selectors from './selectors'

import App from './components'

const mapState = state => ({
  ...selectors.getState(state),
  ...selectors.getPage(state),
})

export default connect(mapState)(App)
