import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Box, Header, Button, ResponsiveContext, Menu } from 'grommet';
import { Logout, Login, Menu as Hambuger } from 'grommet-icons';
import styled from 'styled-components';
import SmallScreenNavBar from './SmallNavBar';
import BigScreenNavBar from './BigScreenNavBar';

const isLoggedIn = false;
const StyledHeader = styled(Header)`
  font-weight: bold;
`;

const NavBar = () => {
  const screenSize = useContext(ResponsiveContext);
  const isSmallScreen = ['xsmall', 'small'].includes(screenSize);

  return (
    <>
      <Box tag='header' direction='row' background='#A7BEAE' pad='medium' wrap>
        <StyledHeader>Fail Overflow</StyledHeader>
        <>
          {isSmallScreen ? (
            <SmallScreenNavBar isLoggedIn={isLoggedIn} />
          ) : (
            <BigScreenNavBar isLoggedIn={isLoggedIn} />
          )}
        </>
      </Box>
    </>
  );
};

export default NavBar;
