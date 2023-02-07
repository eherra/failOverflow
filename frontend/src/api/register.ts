import axios from 'axios';
import { IRegisterValues } from '../types';

const baseUrl = 'http://localhost:8080';
const restUrl = '/api/users';
const url = baseUrl + restUrl;

const register = async (registerValues: IRegisterValues) => {
  const response = await axios.post(url, registerValues);
  return response.data;
};

export default { register };
