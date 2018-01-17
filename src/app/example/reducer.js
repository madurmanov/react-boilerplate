import { ACTIONS } from './constants';

const {
  SET_REMOVE,
} = ACTIONS;

const initial = {
  remove: false,
};

const reducer = (state = initial, action) => {
  switch (action.type) {
    case SET_REMOVE:
      return {
        ...state,
        remove: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
