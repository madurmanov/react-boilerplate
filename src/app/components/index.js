import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'

const styles = {
  root: {},
}

class App extends PureComponent {
  render() {
    const {
      children,
    } = this.props

    return (
      <div>
        App
        {children}
      </div>
    )
  }
}


export default injectSheet(styles)(App)
