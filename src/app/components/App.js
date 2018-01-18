import React, { PureComponent } from 'react';
import { Link, Route } from 'react-router-dom';
import injectSheet from 'react-jss';

import Example from 'src/app/example/container';

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
    } = this.props;

    debug('render');

    return (
      <div>
        <Link to="/example">Example</Link>
        <Route path="/example" component={Example} />
      </div>
    );
  }
};


export default injectSheet(styles)(App);
