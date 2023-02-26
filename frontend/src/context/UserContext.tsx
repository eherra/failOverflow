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
  updateAvatarToUser: (avatarUrl: string | null) => void;
  handleLogin: (data: ILoginValues) => void;
  handleRegister: (values: IRegisterValues) => void;
  handleLogout: () => void;
}

interface IUserProvider {
  children: ReactNode;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  isUserContextLoading: false,
  updateAvatarToUser: () => {},
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

  const updateAvatarToUser = (avatarUrl: string | null) => {
    const loggedUserJSON = localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      loggedUser.avatarUrl = avatarUrl;
      setUser(loggedUser);
      localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isUserContextLoading,
        updateAvatarToUser,
        handleLogin,
        handleRegister,
        handleLogout,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
