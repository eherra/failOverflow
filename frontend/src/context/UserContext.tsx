import { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { ILoginValues } from '../types';
import loginService from '../api/login';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  username: string;
  token?: string;
}

interface IUserContext {
  user: User | null;
  setUser: (user: User) => void;
  userContextLoading: boolean;
  setUserContextLoading: (isLoading: boolean) => void;
  checkLogin: () => void;
  handleLogin: (data: ILoginValues) => void;
  handleLogout: () => void;
}

interface IUserProvider {
  children: ReactNode;
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => null,
  userContextLoading: false,
  setUserContextLoading: (val: boolean) => null,
  checkLogin: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
});

export const UserProvider = ({ children }: IUserProvider) => {
  const [user, setUser] = useState<User | null>(null);
  const [userContextLoading, setUserContextLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = () => {
    setUserContextLoading(true);
    const loggedUserJSON = localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
    setUserContextLoading(false);
  };

  const handleLogin = async (data: ILoginValues) => {
    setUserContextLoading(true);
    try {
      const loggedUserFromDB = await loginService.login({
        username: data.username,
        password: data.password,
      });
      setUser({ id: loggedUserFromDB.id, username: loggedUserFromDB.username });
      localStorage.setItem('loggedUser', JSON.stringify(loggedUserFromDB));
      setUserContextLoading(false);
      navigate('/');
    } catch (err) {
      setUserContextLoading(false);
      navigate('/login'); // needs to fixed, directs now first to landing page
      console.log(err);
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
        userContextLoading,
        setUserContextLoading,
        checkLogin,
        handleLogin,
        handleLogout,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
