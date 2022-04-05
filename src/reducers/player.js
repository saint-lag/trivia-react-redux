const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.gravatarEmail,
      token: action.token,
    };
  default:
    return state;
  }
}
