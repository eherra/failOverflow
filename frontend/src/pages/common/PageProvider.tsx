import { Page } from 'grommet';
import { ReactNode } from 'react';
import NavBar from './NavBar';
import MainFooter from './MainFooter';
import styled from 'styled-components';

interface PageProviderProps {
  children?: ReactNode
}

const WrappedDiv = styled.div`
  min-height: calc(100vh - 55px);
`;

const PageProvider = ({ children }: PageProviderProps) => {
  return (
    <Page>
      <WrappedDiv>
        <NavBar />
        {children}
      </WrappedDiv>
      <MainFooter />
    </Page >
  );
};

export default PageProvider;