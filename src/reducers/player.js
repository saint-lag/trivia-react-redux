import { SAVE_TOKEN, ADD_LOGIN, ADD_GRAVATAR_PICTURE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  token: undefined,
  picture: '',
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
  default:
    return state;
  }
}
