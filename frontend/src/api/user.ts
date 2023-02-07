import axios from 'axios';
import { IRegisterValues, IPasswordChangeFormValues } from '../types';

const baseUrl = 'http://localhost:8080';
const restUrl = '/api/users';
const url = baseUrl + restUrl;

interface IChangePassword {
  id?: string;
  passwordValues: IPasswordChangeFormValues;
}

const registerNewUser = async (registerValues: IRegisterValues) => {
  const response = await axios.post(url, registerValues);
  return response.data;
};

const changePassword = async ({ passwordValues, id }: IChangePassword) => {
  const response = await axios.put(`${url}/${id}`, passwordValues);
  return response.data;
};

export default { registerNewUser, changePassword };
