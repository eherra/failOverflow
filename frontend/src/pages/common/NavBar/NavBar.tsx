import { useContext } from 'react';
import { Box, ResponsiveContext } from 'grommet';
import SmallScreenNavBar from './SmallNavBar';
import BigScreenNavBar from './BigScreenNavBar';
import LogoHeader from './LogoHeader';
import { UserContext } from '../../../context/UserContext';

const NavBar = () => {
  const screenSize = useContext(ResponsiveContext);
  const { user } = useContext(UserContext);

  const isSmallScreen = ['xsmall', 'small'].includes(screenSize);

  return (
    <>
      <Box direction='row' background='#A7BEAE' pad='medium' gap='medium'>
        <LogoHeader isLoggedIn={user.auth} />
        <>
          {isSmallScreen ? (
            <SmallScreenNavBar isLoggedIn={user.auth} />
          ) : (
            <BigScreenNavBar isLoggedIn={user.auth} />
          )}
        </>
      </Box>
    </>
  );
};

export default NavBar;
