import axios from 'axios';
const baseUrl = '/api/users';

interface IUser {
  username: string;
  avatar?: string;
}

const register = async (user: IUser) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};

export default { register };
