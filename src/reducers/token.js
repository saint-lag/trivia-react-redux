const INITIAL_STATE = {
  token: '',
};

export default function token(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'ADD_TOKEN':
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
}
