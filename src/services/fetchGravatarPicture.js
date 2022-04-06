import md5 from 'crypto-js/md5';

const fetchGravatarPicture = (gravatarEmail) => {
  const hash = md5(gravatarEmail).toString();
  const url = `https://www.gravatar.com/avatar/${hash}`;
  return url;
};

export default fetchGravatarPicture;
