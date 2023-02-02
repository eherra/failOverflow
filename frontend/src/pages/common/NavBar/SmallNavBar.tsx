import { Menu } from 'grommet';
import { Menu as Hambuger } from 'grommet-icons';
import { useNavigate } from 'react-router-dom';

interface ISmallScreenNavBar {
  isLoggedIn: boolean;
}

const SmallScreenNavBar = ({ isLoggedIn }: ISmallScreenNavBar) => {
  const navigate = useNavigate();
  return (
    <>
      <Menu
        icon={<Hambuger />}
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
                      console.log('create logout');
                    },
                  },
                ],
              ]
            : [
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
