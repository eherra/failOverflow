import { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { ILoginValues } from '../types';
import loginService from '../api/login';
import { useNavigate } from 'react-router-dom';
import userService from '../api/user';
import { IRegisterValues } from '../types';

interface User {
  id: string;
  username: string;
  token?: string;
}

interface IUserContext {
  user: User | null;
  setUser: (user: User) => void;
  isUserContextLoading: boolean;
  setIsUserContextLoading: (isLoading: boolean) => void;
  checkLogin: () => void;
  handleLogin: (data: ILoginValues) => void;
  handleRegister: (values: any) => void;
  handleLogout: () => void;
}

interface IUserProvider {
  children: ReactNode;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => null,
  isUserContextLoading: false,
  setIsUserContextLoading: (val: boolean) => null,
  checkLogin: () => {},
  handleLogin: () => {},
  handleRegister: () => {},
  handleLogout: () => {},
});

export const UserProvider = ({ children }: IUserProvider) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserContextLoading, setIsUserContextLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    setIsUserContextLoading(true);
    const loggedUserJSON = localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
    setIsUserContextLoading(false);
  };

  const handleLogin = async (data: ILoginValues) => {
    setIsUserContextLoading(true);
    try {
      const loggedUserFromDB = await loginService.login({
        username: data.username,
        password: data.password,
      });
      setUser({ id: loggedUserFromDB.id, username: loggedUserFromDB.username });
      localStorage.setItem('loggedUser', JSON.stringify(loggedUserFromDB));
      setIsUserContextLoading(false);
      navigate('/');
    } catch (err) {
      setIsUserContextLoading(false);
      navigate('/login');
      console.log(err);
    }
  };

  const handleRegister = async (registerValues: IRegisterValues) => {
    setIsUserContextLoading(true);
    try {
      const createdUser = await userService.registerNewUser(registerValues);
      setUser({ id: createdUser.id, username: createdUser.username });
      localStorage.setItem('loggedUser', JSON.stringify(createdUser));
      setIsUserContextLoading(false);
      navigate('/');
    } catch (err) {
      setIsUserContextLoading(false);
      navigate('/register');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isUserContextLoading,
        setIsUserContextLoading,
        checkLogin,
        handleLogin,
        handleRegister,
        handleLogout,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
