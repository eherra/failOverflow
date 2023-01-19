import { Page } from 'grommet';
import { ReactNode } from 'react';
import NavBar from './NavBar';
import MainFooter from './MainFooter';

interface PageProviderProps {
  children?: ReactNode
}

const PageProvider = ({ children }: PageProviderProps) => {
  return (
    <Page>
      <div style={{ minHeight: 'calc(100vh - 55px)' }}> 
        <NavBar />
        {children}
      </div>
      <MainFooter />
    </Page>
  );
};

export default PageProvider;