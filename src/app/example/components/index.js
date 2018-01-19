import React, { PureComponent } from 'react';

const debug = require('debug')('src:app:example:components:index');

class Example extends PureComponent {
  render() {
    const {
      actions,
    } = this.props;

    debug('render');

    return (
      <div>
        Example
      </div>
    );
  }
}

export default Example;
