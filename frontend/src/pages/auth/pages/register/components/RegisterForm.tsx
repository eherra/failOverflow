import { useContext, useState } from 'react';
import { Box, Button, Form, ResponsiveContext, Grid, Image, Spinner } from 'grommet';
import AvatarForm from './AvatarForm';
import UsernamePasswordForm from './UsernamePasswordForm';
import UsernameTakenError from './UsernameTakenError';
import AnchorWithText from '../../../components/AnchorWithText';
import { IRegisterValues } from '../../../../../types';
import { useUserContext } from '../../../../../context/UserContext';

const RegisterForm = () => {
  const { isUserContextLoading, handleRegister } = useUserContext();
  const size = useContext(ResponsiveContext);
  const [formValues, setFormValues] = useState<IRegisterValues>();
  const [isUsernameTakenError, setIsUsernameTakenError] = useState<boolean>(false);

  const handleRegisterSubmit = async (value: IRegisterValues) => {
    try {
      handleRegister(value);
    } catch (e) {
      // error should be caught here and update e.g. setIsUsernameTakenError
      console.log(e);
    }
  };

  return (
    <Grid columns={{ count: 'fit', size: 'medium' }} gap='xxsmall'>
      <Box gap='medium' width='medium' pad={{ horizontal: 'xxsmall' }}>
        <Form
          messages={{
            required: 'Provide some characters here.',
          }}
          onSubmit={({ value }) => handleRegisterSubmit(value)}
          value={formValues}
          onChange={(value) => setFormValues(value)}
          method='post'>
          <UsernamePasswordForm />
          <AvatarForm tipContent='Can be added/edited later on. (Max 2.5MB)' />
          <UsernameTakenError isUsernameTaken={isUsernameTakenError} />
          <Box
            align={['xsmall', 'small'].includes(size) ? undefined : 'start'}
            pad={{ top: 'xxsmall' }}
            gap='small'>
            <Button
              icon={isUserContextLoading ? <Spinner /> : undefined}
              label={isUserContextLoading ? 'Registering account' : 'Register account'}
              primary
              type='submit'
            />
            <AnchorWithText text='Already user? ' anchorLabel='Sign in here' anchorLink='/login' />
          </Box>
        </Form>
      </Box>
      <Box height='medium'>
        <Image src={'/loginRegister/surf2.svg'} fit='contain' />
      </Box>
    </Grid>
  );
};

export default RegisterForm;
