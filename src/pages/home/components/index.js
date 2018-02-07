import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'

import debug from 'src/utils/debug'

import Layout from 'src/components/layout'

const log = debug(__dirname)

const styles = {
  root: {},
}

class Home extends PureComponent {
  render() {
    const {
      classes,
    } = this.props

    log('render')

    return (
      <Layout
        className={classes.root}
      >
        Home
      </Layout>
    )
  }
}


export default injectSheet(styles)(Home)
