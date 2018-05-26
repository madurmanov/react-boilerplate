import { connect } from 'react-redux'

import { page as pageSelectors } from 'selectors'

import App from 'components'

const mapState = state => ({
  page: pageSelectors.getState(state),
})

export default connect(mapState)(App)
