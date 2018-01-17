import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './actions';
import Index from './components';

const mapStateToProps = state => ({
  example: state.example.example,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
