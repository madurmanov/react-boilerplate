import { ACTIONS } from 'src/app/example/constants';

const {
  SET_REMOVE,
} = ACTIONS;

export const setRemove = value => (dispatch, getState) => {
  dispatch({
    type: SET_REMOVE,
    value,
  });
};
