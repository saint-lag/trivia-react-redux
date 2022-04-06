export const SAVE_TOKEN = 'SAVE_TOKEN';

export const saveToken = (payload) => ({
  type: SAVE_TOKEN, payload,
});

export const addLogin = (payload) => ({
  type: 'ADD_LOGIN', payload,
});

export const addToken = (token) => ({
  type: 'ADD_TOKEN', token,
});
