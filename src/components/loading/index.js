import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'
import debug from 'src/utils/debug'

const log = debug(__dirname)

const styles = {
  root: {},
}

class Loading extends PureComponent {
  render() {
    const {
      classes,
    } = this.props

    log('render')

    return (
      <div
        className={classes.root}
      >
        Loading
      </div>
    )
  }
}

export default injectSheet(styles)(Loading)
