import { ACTIONS } from './constants';

const {
  INIT,
} = ACTIONS;

export const init = () => (dispatch, getState, { api }) => {
  const data = {};
  const promises = [];
  promises.push(
    api('example').then(res => { data.example = res.example }),
  );
  return Promise.all(promises).then(() => {
    dispatch({
      type: INIT,
      value: data,
    });
  });
};
