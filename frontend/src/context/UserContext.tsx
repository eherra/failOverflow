import React, { createContext, ReactNode, useState, useContext } from 'react';

interface User {
  username: string;
  auth: boolean;
}

interface IUserProvider {
  children: ReactNode;
}

export const UserContext = createContext({
  user: { username: '', auth: false },
  login: (username: string) => {},
  logout: () => {},
});

export const UserProvider = ({ children }: IUserProvider) => {
  const [user, setUser] = useState<User>({ username: '', auth: false });

  const login = (username: string) => {
    setUser(() => ({
      username: username,
      auth: true,
    }));
  };

  const logout = () => {
    setUser(() => ({
      username: '',
      auth: false,
    }));
  };

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
