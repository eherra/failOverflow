import { useContext } from 'react';
import { Box, ResponsiveContext } from 'grommet';
import SmallScreenNavBar from './SmallNavBar';
import BigScreenNavBar from './BigScreenNavBar';
import LogoHeader from './LogoHeader';

const isLoggedIn = true;

const NavBar = () => {
  const screenSize = useContext(ResponsiveContext);
  const isSmallScreen = ['xsmall', 'small'].includes(screenSize);

  return (
    <>
      <Box direction='row' background='#A7BEAE' pad='medium' gap='medium'>
        <LogoHeader isLoggedIn={isLoggedIn} />
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
