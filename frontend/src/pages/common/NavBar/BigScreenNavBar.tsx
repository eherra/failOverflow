import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Box, Button } from 'grommet';
import { Logout, StatusGood } from 'grommet-icons';
import { useUserContext } from '../../../context/UserContext';
import { useNotificationContext } from '../../../context/NotificationContext';
import styled from 'styled-components';

const StyledNavButton = styled(Button)<{ isActive: boolean }>`
  text-decoration: ${(props) => (props.isActive ? 'underline #454545 3px' : undefined)};
  text-underline-offset: ${(props) => (props.isActive ? '5px' : undefined)};
`;

const StyledLogoutButton = styled(Button)`
  display: inline-block;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 3px;
    bottom: 0;
    left: 0;
    background-color: #454545;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

interface IBigScreenNavBar {
  isLoggedIn: boolean;
}

const BigScreenNavBar = ({ isLoggedIn }: IBigScreenNavBar) => {
  const { handleLogout } = useUserContext();
  const { createNotification } = useNotificationContext();
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    createNotification({
      message: 'Successfully signed out. See you soon!',
      isError: false,
      icon: <StatusGood color='#96ab9c' />,
    });
    navigate('/landing');
  };

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

          <StyledLogoutButton
            plain
            style={{ marginLeft: 'auto' }}
            icon={<Logout />}
            label='Logout'
            onClick={() => logout()}
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
