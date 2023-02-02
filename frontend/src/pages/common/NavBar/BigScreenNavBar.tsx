import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button } from 'grommet';
import { Logout } from 'grommet-icons';
import { UserContext } from '../../../context/UserContext';

interface IBigScreenNavBar {
  isLoggedIn: boolean;
}

const BigScreenNavBar = ({ isLoggedIn }: IBigScreenNavBar) => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
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
          </Box>

          <Button
            style={{ marginLeft: 'auto' }}
            type='button'
            icon={<Logout />}
            label='Logout'
            onClick={() => {
              logout();
              navigate('/landing');
            }}
            color='fffff'
          />
        </>
      ) : (
        <>
          <Link to='/failures'>
            <Button hoverIndicator label='Failures' />
          </Link>
          <Box direction='row' gap='small' style={{ marginLeft: 'auto' }}>
            <Link to='/login'>
              <Button hoverIndicator label='Sign in' />
            </Link>
            <Link to='/register'>
              <Button
                hoverIndicator
                color='#efefef'
                label='Create account'
                style={{ background: 'white' }}
              />
            </Link>
          </Box>
        </>
      )}
    </>
  );
};

export default BigScreenNavBar;
