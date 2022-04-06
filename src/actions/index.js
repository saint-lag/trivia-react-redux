export const SAVE_TOKEN = 'SAVE_TOKEN';

export const saveToken = (payload) => ({
  type: SAVE_TOKEN, payload,

export const addLogin = (name, gravatarEmail) => ({
  type: 'ADD_LOGIN', name, gravatarEmail,
});

export const addToken = (token) => ({
  type: 'ADD_TOKEN', token,
});
