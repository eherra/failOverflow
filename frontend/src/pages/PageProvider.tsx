import { Page } from 'grommet';
import { ReactNode } from 'react';
import NavBar from './NavBar';

interface PageProviderProps {
  children?: ReactNode
}

const PageProvider = ({ children}: PageProviderProps) => {
  return (
    <Page>
      <NavBar />
      {children}
    </Page>
  );
};

export default PageProvider;