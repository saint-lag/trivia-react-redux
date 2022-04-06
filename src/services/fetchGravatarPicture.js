import md5 from 'crypto-js/md5';

const fetchGravatarPicture = async (gravatarEmail) => {
  const hash = md5(gravatarEmail).toString();
  const url = `https://www.gravatar.com/avatar/${hash}`;
  try {
    const resolve = await fetch(url);
    const data = await resolve.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchGravatarPicture;
