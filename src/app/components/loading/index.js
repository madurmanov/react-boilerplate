import React, { PureComponent } from 'react'

const debug = require('debug')(`${__dirname}`)

class Loading extends PureComponent {
  render() {
    debug('render', this.props)

    return (
      <div>
        Loading
      </div>
    )
  }
}

export default Loading
