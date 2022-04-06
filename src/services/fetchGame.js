const fetchGame = async (token) => {
  const quantity = 5;
  // const token = 'db2d9f52f48eca2797a009b11c9c18747b674db10f470a05664dcd52af4c5b0f';
  const url = `https://opentdb.com/api.php?amount=${quantity}&token=${token}`;
  try {
    const resolve = await fetch(url);
    const data = await resolve.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchGame;
