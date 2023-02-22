import { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { ILoginValues } from '../types';
import loginService from '../api/login';
import userService from '../api/user';
import { IRegisterValues } from '../types';

interface User {
  id: string;
  username: string;
  avatarUrl?: string;
  token?: string;
}

interface IUserContext {
  user: User | null;
  isUserContextLoading: boolean;
  updateAvatar: (values: string) => void;
  handleLogin: (data: ILoginValues) => void;
  handleRegister: (values: any) => void;
  handleLogout: () => void;
}

interface IUserProvider {
  children: ReactNode;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  isUserContextLoading: false,
  updateAvatar: () => {},
  handleLogin: () => {},
  handleRegister: () => {},
  handleLogout: () => {},
});

export const UserProvider = ({ children }: IUserProvider) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserContextLoading, setIsUserContextLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuthorization();
  }, []);

  const checkAuthorization = () => {
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
      setUser({
        id: loggedUserFromDB.id,
        username: loggedUserFromDB.username,
        avatarUrl: loggedUserFromDB?.avatarUrl,
      });
      localStorage.setItem('loggedUser', JSON.stringify(loggedUserFromDB));
      setIsUserContextLoading(false);
    } catch (err) {
      setIsUserContextLoading(false);
      throw err;
    }
  };

  const handleRegister = async (registerValues: IRegisterValues) => {
    setIsUserContextLoading(true);
    try {
      const createdUser = await userService.registerNewUser(registerValues);
      console.log(createdUser);
      setUser({
        id: createdUser.id,
        username: createdUser.username,
        avatarUrl: createdUser?.avatarUrl,
      });
      localStorage.setItem('loggedUser', JSON.stringify(createdUser));
      setIsUserContextLoading(false);
    } catch (err) {
      setIsUserContextLoading(false);
      throw err;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setUser(null);
  };

  const updateAvatar = (avatarUrl: string) => {
    const loggedUserJSON = localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const logUser = JSON.parse(loggedUserJSON);
      setUser({ ...logUser, avatarUrl: avatarUrl });
      localStorage.removeItem('loggedUser');
      localStorage.setItem('loggedUser', JSON.stringify(user));
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isUserContextLoading,
        updateAvatar,
        handleLogin,
        handleRegister,
        handleLogout,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
