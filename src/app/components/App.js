import React, { PureComponent } from 'react'
import { Route } from 'react-router-dom'
import injectSheet from 'react-jss'

import Example from 'src/app/example'

const debug = require('debug')('src:app:components:App')

const styles = {
  root: {},
}

class App extends PureComponent {
  render() {
    debug('render')

    return (
      <div>
        App
        <Route path="/example" component={Example.route} />
      </div>
    )
  }
}


export default injectSheet(styles)(App)
