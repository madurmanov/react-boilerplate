import React, { PureComponent } from 'react';

const debug = require('debug')('src:app:example:components:index');

class Example extends PureComponent {
  render() {
    const {
      actions,
      example,
      remove,
    } = this.props;

    debug('render');

    const button = (!remove && example) && <button onClick={() => { actions.setRemove(!remove) }}>Remove</button>;

    return (
      <div>
        Example
        {button}
      </div>
    );
  }
}

export default Example;
