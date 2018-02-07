import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'
import Link from 'redux-first-router-link'

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
        <nav>
          <Link to="/">Home</Link>&nbsp;
          <Link to="/about">About</Link>
        </nav>
        <header>Header</header>
        <main>{children}</main>
        <footer>Footer</footer>
      </div>
    )
  }
}


export default injectSheet(styles)(App)
