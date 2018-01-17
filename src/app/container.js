import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './actions';
import { getData } from './selectors';
import App from './components/App';

const mapStateToProps = state => ({
  data: getData(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
