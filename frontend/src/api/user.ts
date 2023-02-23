import axios from 'axios';
import { IRegisterValues, IPasswordChangeFormValues } from '../types';

const restUrl = '/api/users';

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

const configWithFormData = () => {
  return {
    headers: { Authorization: `Bearer ${getJwtToken()}`, 'Content-Type': 'multipart/form-data' },
  };
};

const registerNewUser = async (registerValues: IRegisterValues) => {
  /* @ts-expect-error giving error */
  const avatar = registerValues?.avatar ? registerValues?.avatar[0] : undefined;
  const formValues = { ...registerValues, avatar: avatar };
  const response = await axios.post(restUrl, formValues, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

const changeAvatar = async (value: any) => {
  const avatar = value?.avatar ? value?.avatar[0] : undefined;
  const formValues = { avatar: avatar };
  const response = await axios.put(`${restUrl}/avatar`, formValues, configWithFormData());
  return response.data;
};

const changePassword = async ({ passwordValues }: IChangePassword) => {
  const response = await axios.put(restUrl, passwordValues, config());
  return response.data;
};

export default { registerNewUser, changeAvatar, changePassword };
