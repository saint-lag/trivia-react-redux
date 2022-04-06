import { SAVE_TOKEN } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
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
  case 'ADD_LOGIN':
    console.log(`PLAYER_ACTION: ${action}`);
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.gravatarEmail,
    };
  default:
    return state;
  }
}
