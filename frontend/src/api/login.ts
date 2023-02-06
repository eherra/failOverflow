import axios from 'axios';
const baseUrl = 'http://localhost:8080';
const restUrl = '/api/login';
const url = baseUrl + restUrl;

interface ILogin {
  username: string;
  password: string;
}

const login = async (credentials: ILogin) => {
  const response = await axios.post(url, credentials);
  return response.data;
};

export default { login };
