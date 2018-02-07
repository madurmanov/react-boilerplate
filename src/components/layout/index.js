import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'

import debug from 'src/utils/debug'

const log = debug(__dirname)

const styles = {
  root: {},
}

class Layout extends PureComponent {
  render() {
    const {
      classes,
      className,
      children,
    } = this.props

    log('render')

    return (
      <div
        className={classes.root}
      >
        <header>Header</header>
        <main className={className}>{children}</main>
        <footer>Footer</footer>
      </div>
    )
  }
}

export default injectSheet(styles)(Layout)
