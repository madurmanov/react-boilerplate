import { getExample } from 'src/app/example/selectors';
import { ACTIONS } from 'src/app/example/constants';

const {
  TOGGLE_EXAMPLE,
} = ACTIONS;

export const toggleExample = value => (dispatch, getState) => {
  dispatch({
    type: TOGGLE_EXAMPLE,
    value: !getExample(getState()),
  });
};
