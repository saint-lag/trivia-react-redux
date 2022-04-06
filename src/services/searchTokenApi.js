const searchTokenAPI = async () => {
  const getTokenAPI = 'https://opentdb.com/api_token.php?command=request';
  const APIResponse = await fetch(getTokenAPI);
  const { token } = await APIResponse.json();
  const response = token;
  return response;
};

export default searchTokenAPI;
