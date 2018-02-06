import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'

const styles = {
  root: {},
}

class Home extends PureComponent {
  render() {
    const {
      classes,
    } = this.props

    return (
      <div
        className={classes.root}
      >
        Home
      </div>
    )
  }
}


export default injectSheet(styles)(Home)
