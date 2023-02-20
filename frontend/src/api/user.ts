import axios from 'axios';
import { IRegisterValues, IPasswordChangeFormValues } from '../types';

const baseUrl = 'http://localhost:8080';
const restUrl = '/api/users';
const url = baseUrl + restUrl;

interface IChangePassword {
  id?: string;
  passwordValues: IPasswordChangeFormValues;
}

const getJwtToken = () => {
  const loggedUserJSON = localStorage.getItem('loggedUser');
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    return user.token;
  }
  return null;
};

const config = () => {
  return {
    headers: { Authorization: `Bearer ${getJwtToken()}` },
  };
};

const registerNewUser = async (registerValues: IRegisterValues) => {
  /* @ts-expect-error giving error */
  const avatar = registerValues?.avatar ? registerValues?.avatar[0] : undefined;
  const formValues = { ...registerValues, avatar: avatar };
  const response = await axios.post(url, formValues, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

const changePassword = async ({ passwordValues }: IChangePassword) => {
  const response = await axios.put(`${url}`, passwordValues, config());
  return response.data;
};

export default { registerNewUser, changePassword };
