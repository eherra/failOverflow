import { createContext, ReactNode, useContext } from 'react';
import useAuth from '../hooks/useAuth';
import { ILoginValues } from '../types';

interface IUserProvider {
  children: ReactNode;
}

export interface User {
  id: string;
  username: string;
  token?: string;
}

interface IAuthContext {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (data: ILoginValues) => void;
  logout: (user: User | null) => void;
  register: (user: User | null) => void;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
  register: () => {},
});

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }: IUserProvider) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export { useAuthContext, AuthProvider };
