import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';

const debug = require('debug')('src:app:components:App');

const styles = {
  root: {},
};

class App extends PureComponent {
  componentWillMount() {
    this.props.actions.init();
  }

  render() {
    const {
      classes,
      children,
    } = this.props;

    debug('render');

    return (
      <div
        className={classes.root}
      >
        App
        {children}
      </div>
    );
  }
};


export default injectSheet(styles)(App);
