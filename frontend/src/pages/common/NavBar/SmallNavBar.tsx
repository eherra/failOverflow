import { Menu } from 'grommet';
import { Menu as Hambuger } from 'grommet-icons';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';

interface ISmallScreenNavBar {
  isLoggedIn: boolean;
}

const SmallScreenNavBar = ({ isLoggedIn }: ISmallScreenNavBar) => {
  const navigate = useNavigate();
  const { handleLogout } = useUserContext();

  return (
    <>
      <Menu
        icon={<Hambuger />}
        style={{ marginLeft: 'auto' }}
        hoverIndicator
        items={
          isLoggedIn
            ? [
                [
                  {
                    label: 'Failures',
                    onClick: () => {
                      navigate('/failures');
                    },
                  },
                  {
                    label: 'Profile',
                    onClick: () => {
                      navigate('/profile');
                    },
                  },
                ],
                [
                  {
                    label: 'Logout',
                    onClick: () => {
                      handleLogout();
                      navigate('/landing');
                    },
                  },
                ],
              ]
            : [
                [
                  {
                    label: 'Failures',
                    onClick: () => {
                      navigate('/failures');
                    },
                  },
                ],
                [
                  {
                    label: 'Sign in',
                    onClick: () => {
                      navigate('/login');
                    },
                  },
                  {
                    label: 'Create account',
                    onClick: () => {
                      navigate('/register');
                    },
                  },
                ],
              ]
        }
      />
    </>
  );
};

export default SmallScreenNavBar;
