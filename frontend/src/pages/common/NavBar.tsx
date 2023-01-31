import { Link } from 'react-router-dom';
import { Box, Header, Button } from 'grommet';
import { Logout, Login } from 'grommet-icons';
import styled from 'styled-components';

const isLoggedIn = true;

const StyledHeader = styled(Header)`
  font-weight: bold;
`;

const NavBar = () => {
  return (
    <>
      <Box tag='header' direction='row' background='#A7BEAE' pad='medium' wrap>
        <StyledHeader>Fail Overflow</StyledHeader>
        {isLoggedIn ? (
          <>
            <Box direction='row' gap='large'>
              <Link to='/'>
                <Button hoverIndicator label='Home' />
              </Link>
              <Link to='/failures'>
                <Button hoverIndicator label='Failures' />
              </Link>
              <Link to='/profile'>
                <Button hoverIndicator label='Profile' />
              </Link>
              <Link to='/landing'>
                <Button hoverIndicator label='Landing Page' />
              </Link>
              <Button type='button' icon={<Logout />} label='Logout' color='fffff' />
            </Box>
          </>
        ) : (
          <Box direction='row'>
            <Link to='/login'>
              <Button hoverIndicator label='Sign in' />
            </Link>
            <Link to='/register'>
              <Button hoverIndicator color='fffff' label='Create account' style={{ background: 'white' }} />
            </Link>
          </Box>
        )}
      </Box>
    </>
  );
};

export default NavBar;
