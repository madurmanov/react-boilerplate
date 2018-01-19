import React, { PureComponent } from 'react'

const debug = require('debug')('src:app:example:components:index')

class Example extends PureComponent {
  render() {
    debug('render')

    return (
      <div>
        Example
      </div>
    )
  }
}

export default Example
