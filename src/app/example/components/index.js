import React, { PureComponent } from 'react';

const debug = require('debug')('src:app:example:components:index');

class Index extends PureComponent {
  render() {
    const {
      actions,
      example,
    } = this.props;

    debug('render');

    const button = !example && <button onClick={actions.toggleExample}>Remove</button>;

    return (
      <div>
        Index
        {button}
      </div>
    );
  }
}

export default Index;
