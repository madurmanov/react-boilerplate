import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'

import Routes from 'src/app/routes'

const debug = require('debug')('src:app:components:App')

const styles = {
  root: {},
}

class App extends PureComponent {
  componentWillMount() {
    this.props.actions.init()
  }

  render() {
    debug('render')

    return (
      <div>
        App
        <Routes />
      </div>
    )
  }
}


export default injectSheet(styles)(App)
