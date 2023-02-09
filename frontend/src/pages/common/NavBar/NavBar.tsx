import { useContext } from 'react';
import { Box, ResponsiveContext } from 'grommet';
import SmallScreenNavBar from './SmallNavBar';
import BigScreenNavBar from './BigScreenNavBar';
import LogoHeader from './LogoHeader';
import { useUserContext } from '../../../context/UserContext';

const NavBar = () => {
  const { user } = useUserContext();
  const screenSize = useContext(ResponsiveContext);
  const isSmallScreen = ['xsmall', 'small'].includes(screenSize);

  return (
    <>
      <Box direction='row' background='#A7BEAE' pad='medium' gap='medium'>
        <LogoHeader isLoggedIn={!!user} />
        <>
          {isSmallScreen ? (
            <SmallScreenNavBar isLoggedIn={!!user} />
          ) : (
            <BigScreenNavBar isLoggedIn={!!user} />
          )}
        </>
      </Box>
    </>
  );
};

export default NavBar;
