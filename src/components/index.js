import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'
import debug from 'src/utils/debug'

const log = debug(__dirname)

const styles = {
  root: {
    '& p': {
      margin: 0,
    },
  },
}

class App extends PureComponent {
  render() {
    const {
      classes,
      width,
      height,
      children,
    } = this.props

    log('render')

    return (
      <div
        className={classes.root}
      >
        <p>App</p>
        <p>App width: {width}</p>
        <p>App height: {height}</p>
        {children}
      </div>
    )
  }
}


export default injectSheet(styles)(App)
