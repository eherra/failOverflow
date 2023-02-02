import styled from 'styled-components';
import { Header, Box } from 'grommet';
import { useNavigate } from 'react-router-dom';
import { Bug } from 'grommet-icons';

const StyledHeader = styled(Header)`
  font-weight: bold;
  font-size: 20px;
`;

interface ILogoHeader {
  isLoggedIn: boolean;
}

const LogoHeader = ({ isLoggedIn }: ILogoHeader) => {
  const navigate = useNavigate();

  return (
    <Box direction='row' gap='xsmall'>
      <Bug color='#454545' />
      <StyledHeader
        onClick={() => {
          isLoggedIn ? navigate('/') : navigate('/landing');
        }}>
        Fail Overflow
      </StyledHeader>
    </Box>
  );
};

export default LogoHeader;
