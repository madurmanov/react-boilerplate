import { ACTIONS } from './constants';

const {
  TOGGLE_EXAMPLE,
} = ACTIONS;

const initial = {
  example: false,
};

const reducer = (state = initial, action) => {
  switch (action.type) {
    case TOGGLE_EXAMPLE:
      return {
        ...state,
        example: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
