import axios from 'axios';
export const getImageURl = async file => {
  const {
    data: { url },
  } = await axios.get('http://localhost:4000/s3Url');
  await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    body: file,
  });
  return url.split('?')[0];
};

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
