import {
  SAVE_TOKEN,
  ADD_LOGIN,
  ADD_GRAVATAR_PICTURE,
  UPDATE_SCORE,
  UPDATE_CORRECT_ANSWERS } from '../actions/index';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  token: undefined,
  picture: '',
  correctAnswers: 0,
};

export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_TOKEN:
    return {
      ...state,
      token: action.payload,
    };
  case ADD_LOGIN:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    };
  case ADD_GRAVATAR_PICTURE:
    return {
      ...state,
      picture: action.picture,
    };
  case UPDATE_SCORE:
    return {
      ...state,
      score: action.payload + state.score,
    };
  case UPDATE_CORRECT_ANSWERS:
    return {
      ...state,
      correctAnswers: action.payload,
    };
  default:
    return state;
  }
}
