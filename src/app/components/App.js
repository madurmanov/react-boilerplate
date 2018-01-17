import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';

import example from '../example';

const debug = require('debug')('src:app:components:App');

const styles = {
  root: {},
};

class App extends PureComponent {
  render() {
    const {
      classes,
    } = this.props;

    debug('render');

    return (
      <div
        className={classes.root}
      >
        App
        <example.container />
      </div>
    );
  }
};


export default injectSheet(styles)(App);
