import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Box, Button } from 'grommet';
import { Logout } from 'grommet-icons';
import styled from 'styled-components';
import { useUserContext } from '../../../context/UserContext';

const StyledNavButton = styled(Button)<{ isActive: boolean }>`
  text-decoration: ${(props) => (props.isActive ? 'underline #454545 3px' : undefined)};
  text-underline-offset: ${(props) => (props.isActive ? '5px' : undefined)};
`;

interface IBigScreenNavBar {
  isLoggedIn: boolean;
}

const BigScreenNavBar = ({ isLoggedIn }: IBigScreenNavBar) => {
  const { handleLogout } = useUserContext();
  const navigate = useNavigate();

  return (
    <>
      {isLoggedIn ? (
        <>
          <Box direction='row' gap='large'>
            <NavLink to='/'>
              {({ isActive }) => (
                <StyledNavButton isActive={isActive} hoverIndicator label='Home' />
              )}
            </NavLink>

            <NavLink to='/failures'>
              {({ isActive }) => (
                <StyledNavButton isActive={isActive} hoverIndicator label='Failures' />
              )}
            </NavLink>
            <NavLink to='/profile'>
              {({ isActive }) => (
                <StyledNavButton isActive={isActive} hoverIndicator label='Profile' />
              )}
            </NavLink>
          </Box>

          <Button
            style={{ marginLeft: 'auto' }}
            type='button'
            icon={<Logout />}
            label='Logout'
            onClick={() => {
              handleLogout();
              navigate('/landing');
            }}
            color='fffff'
          />
        </>
      ) : (
        <>
          <NavLink to='/failures'>
            {({ isActive }) => (
              <StyledNavButton isActive={isActive} hoverIndicator label='Failures' />
            )}
          </NavLink>
          <Box direction='row' gap='small' style={{ marginLeft: 'auto' }}>
            <Link to='/login'>
              <Button hoverIndicator label='Sign in' />
            </Link>
            <Link to='/register'>
              <Button
                hoverIndicator
                color='#efefef'
                label='Create account'
                style={{ background: '#efefef' }}
              />
            </Link>
          </Box>
        </>
      )}
    </>
  );
};

export default BigScreenNavBar;
