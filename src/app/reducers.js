import { combineReducers } from 'redux';

import app from './reducer';

export default asyncReducers => combineReducers({
  app,
  ...asyncReducers,
});
