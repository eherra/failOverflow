import { Page } from 'grommet';
import { ReactNode } from 'react';
import NavBar from './NavBar/NavBar';
import MainFooter from './MainFooter';
import styled from 'styled-components';

// 8vh is the height of footer
const WrappedDiv = styled.div`
  min-height: calc(100vh - 8vh);
`;

interface PageProviderProps {
  children?: ReactNode;
}

const PageProvider = ({ children }: PageProviderProps) => {
  return (
    <Page>
      <WrappedDiv>
        <NavBar />
        {children}
      </WrappedDiv>
      <MainFooter />
    </Page>
  );
};

export default PageProvider;
