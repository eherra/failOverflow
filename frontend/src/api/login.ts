import axios from 'axios';
const baseUrl = 'http://localhost:8080';
const restUrl = '/api/login';
const url = baseUrl + restUrl;

interface ILoginCredentials {
  username: string;
  password: string;
}

const login = async (loginCredentials: ILoginCredentials) => {
  const response = await axios.post(url, loginCredentials);
  return response.data;
};

export default { login };
