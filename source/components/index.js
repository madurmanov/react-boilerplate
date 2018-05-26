import debug from 'debug'
import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import universal from 'react-universal-component'

import Loading from './Loading'

const log = debug('app:Index')

const UniversalComponent = universal(({ page }) =>
  import(`./${page}`), {
  minDelay: 500,
  alwaysDelay: true,
  loading: Loading,
})

class Index extends PureComponent {
  static propTypes = {
    page: PropTypes.string.isRequired,
  }

  render() {
    log('render')

    const {
      page,
    } = this.props

    return (
      <Fragment>
        <p>Hello, World!</p>
        <UniversalComponent page={page} />
      </Fragment>
    )
  }
}

export default Index
