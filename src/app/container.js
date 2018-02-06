import { connect } from 'react-redux'

import * as actions from './actions'
import App from './components'

const mapState = () => ({})

export default connect(mapState, actions)(App)
