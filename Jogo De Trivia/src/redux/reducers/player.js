import { ADD_NAME, ADD_EMAIL, ADD_SCORE, ADD_ASSERTIONS } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_NAME:
    return {
      ...state,
      name: action.payload,
    };
  case ADD_EMAIL:
    return {
      ...state,
      email: action.payload,
      gravatarEmail: action.payload,
    };
  case ADD_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  case ADD_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload,
    };
  default: return state;
  }
}

export default player;
