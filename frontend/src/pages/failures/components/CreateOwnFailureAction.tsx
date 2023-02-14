import { Box, Text, Button } from 'grommet';
import CreateFailureSideModal from '../../common/CreateFailureSideModal/CreateFailureSideModal';
import { useUserContext } from '../../../context/UserContext';
import { Login } from 'grommet-icons';
import { WavyLink } from 'react-wavy-transitions';

const CreateYourOwnFailure = () => {
  const { user } = useUserContext();

  return (
    <Box align='start' pad={{ top: 'small', bottom: 'small' }} gap='small'>
      <Text weight='bold' size='medium'>
        Want to create your own?
      </Text>
      {user ? (
        <CreateFailureSideModal />
      ) : (
        <WavyLink to='/login' color='#A7BEAE' duration='1000' direction='down'>
          <Button primary hoverIndicator label='Sign in' icon={<Login />} />
        </WavyLink>
      )}
    </Box>
  );
};

export default CreateYourOwnFailure;
