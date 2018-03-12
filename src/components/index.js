import debug from 'debug'
import React, { Fragment, PureComponent } from 'react'
import universal from 'react-universal-component'

import Error from './Error'
import Loading from './Loading'

const log = debug('app:Index')

const UniversalComponent = universal(({ page }) =>
  import(`src/pages/${page}`), {
  minDelay: 500,
  loading: Loading,
  error: Error,
})

class App extends PureComponent {
  render() {
    const {
      page,
    } = this.props

    log('render')

    return (
      <Fragment>
        <p>Hello, World!</p>
        <UniversalComponent page={page} />
      </Fragment>
    )
  }
}

export default App
