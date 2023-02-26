import axios from 'axios';
import { IRegisterValues, IPasswordChangeFormValues } from '../types';
import { getJwtHeader, getJwtHeaderWithFormData } from './utils/headers';
const restUrl = '/api/users';

interface IChangePassword {
  id?: string;
  passwordValues: IPasswordChangeFormValues;
}

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
  const response = await axios.put(`${restUrl}/avatar`, formValues, getJwtHeaderWithFormData());
  return response.data;
};

const deleteAvatar = async () => {
  const response = await axios.delete(`${restUrl}/avatar`, getJwtHeader());
  return response.data;
};

const changePassword = async ({ passwordValues }: IChangePassword) => {
  const response = await axios.put(restUrl, passwordValues, getJwtHeader());
  return response.data;
};

export default { registerNewUser, changeAvatar, changePassword, deleteAvatar };
