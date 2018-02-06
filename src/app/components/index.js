import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'

const debug = require('debug')(`${__dirname}`)

const styles = {
  root: {},
}

class App extends PureComponent {
  render() {
    const {
      children,
    } = this.props

    debug('render')

    return (
      <div>
        App
        {children}
      </div>
    )
  }
}


export default injectSheet(styles)(App)
