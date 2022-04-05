const fetchGame = async () => {
  const quantity = 5;
  const token = '314c699538cb9eb13a722d1c5d87caa6dded91caf7af627baf787bd862754066';
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
