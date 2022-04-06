export const addLogin = (name, gravatarEmail) => ({
  type: 'ADD_LOGIN', name, gravatarEmail,
});

export const addToken = (token) => ({
  type: 'ADD_TOKEN', token,
});
