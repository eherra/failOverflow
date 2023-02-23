import axios from 'axios';
const restUrl = '/api/login';

interface ILoginCredentials {
  username: string;
  password: string;
}

const login = async (loginCredentials: ILoginCredentials) => {
  const response = await axios.post(restUrl, loginCredentials);
  return response.data;
};

export default { login };
