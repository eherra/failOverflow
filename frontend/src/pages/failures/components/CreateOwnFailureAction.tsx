import { Link } from 'react-router-dom';
import { Box, Text, Button } from 'grommet';
import CreateFailureSideModal from '../../common/CreateFailureSideModal/CreateFailureSideModal';
import { useUserContext } from '../../../context/UserContext';
import { Login } from 'grommet-icons';

const CreateYourOwnFailure = () => {
  const { user } = useUserContext();

  return (
    <Box pad={{ top: 'small', bottom: 'small' }} gap='small'>
      <Text weight='bold' size='medium'>
        Want to create your own?
      </Text>
      {user ? (
        <CreateFailureSideModal />
      ) : (
        <Link to='/login'>
          <Button primary hoverIndicator label='Sign in' icon={<Login />} />
        </Link>
      )}
    </Box>
  );
};

export default CreateYourOwnFailure;
