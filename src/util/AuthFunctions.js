import axios from 'axios';

export const authLogin = async (username, password) => {
  const resTwo = await axios({
    method: 'POST',
    data: {
      username,
      password,
    },
    withCredentials: true,
    url: 'http://localhost:4000/auth/login',
  });
  return resTwo.data;
};
