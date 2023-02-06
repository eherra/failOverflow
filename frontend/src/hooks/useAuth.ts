import { useState } from 'react';
import loginService from '../api/login';
import registerService from '../api/register';
import { ILoginValues } from '../types';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  username: string;
}

const useAuth = () => {
  console.log('Hep');
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const login = async (data: ILoginValues) => {
    try {
      const authResult = await loginService.login({
        username: data.username,
        password: data.password,
      });
      setUser({ id: authResult.id, username: authResult.username });
      console.log('registered');
      navigate('/');
    } catch (err) {
      navigate('/login'); // needs to fixed, directs now first to landing page
      console.log(err);
    }
  };

  const register = async (data: any) => {
    try {
      const authResult = await registerService.register({
        username: data.username,
        avatar: 'test',
      });

      console.log(authResult);
      //setUser(userObj);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return { user, setUser, register, login, logout };
};

export default useAuth;
