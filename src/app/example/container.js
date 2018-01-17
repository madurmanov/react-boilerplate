import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from './actions';
import Index from './components';
import { getRemove } from './selectors';
import { getExample } from '../selectors';

const mapStateToProps = state => ({
  example: getExample(state),
  remove: getRemove(state),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
