import React, { PureComponent } from 'react'

const debug = require('debug')('src:app:example:components')

class Example extends PureComponent {
  render() {
    const {
      example,
    } = this.props

    debug('render')

    return (
      <div>
        Example: { example.toString() }
      </div>
    )
  }
}

export default Example
