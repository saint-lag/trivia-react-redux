// import fetchGravatarPicture from '../services/fetchGravatarPicture';

export const SAVE_TOKEN = 'SAVE_TOKEN';
export const ADD_GRAVATAR_PICTURE = 'ADD_GRAVATAR_PICTURE';
export const ADD_LOGIN = 'ADD_LOGIN';
export const ADD_TOKEN = 'ADD_TOKEN';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const saveToken = (payload) => ({
  type: SAVE_TOKEN, payload,
});

export const addLogin = (payload) => ({
  type: ADD_LOGIN, payload,
});

export const addToken = (token) => ({
  type: ADD_TOKEN, token,
});

export const addGravatarPicture = (picture) => ({
  type: ADD_GRAVATAR_PICTURE, picture,
});

export const updateScore = (payload) => ({
  type: UPDATE_SCORE, payload,
});

// export function fetchPicture() {
//   return async (dispatch) => {
//     const response = await fetchGravatarPicture();
//     if (response.status === 'ok') {
//       const currencies = Object.keys(response.data).filter(
//         (curr) => curr !== 'USDT',
//       );
//       dispatch(saveCurrencies(currencies));
//     }
//   };
// }
