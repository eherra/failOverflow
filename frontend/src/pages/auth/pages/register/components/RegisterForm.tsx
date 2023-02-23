import { useContext, useState } from 'react';
import { Box, Button, Form, ResponsiveContext, Grid, Image, Spinner } from 'grommet';
import AvatarForm from './AvatarForm';
import UsernamePasswordForm from './UsernamePasswordForm';
import AnchorWithText from '../../../components/AnchorWithText';
import { IRegisterValues } from '../../../../../types';
import { useUserContext } from '../../../../../context/UserContext';
import { useNotificationContext } from '../../../../../context/NotificationContext';
import { UserExpert } from 'grommet-icons';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const { isUserContextLoading, handleRegister } = useUserContext();
  const { createNotification, handleError } = useNotificationContext();
  const navigate = useNavigate();

  const size = useContext(ResponsiveContext);
  const [formValues, setFormValues] = useState<IRegisterValues>();

  const handleRegisterSubmit = async (value: IRegisterValues) => {
    try {
      await handleRegister(value);
      createNotification({
        message: 'Account creating succeeded, welcome!',
        isError: false,
        icon: <UserExpert color='#96ab9c' />,
      });
      navigate('/');
    } catch (error: any) {
      handleError(error);
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
          method='post'
          encType='multipart/form-data'>
          <UsernamePasswordForm />
          <AvatarForm tipContent='Can be added/edited later on. (Max 2.5MB)' />
          <Box
            align={['xsmall', 'small'].includes(size) ? undefined : 'start'}
            pad={{ top: 'xxsmall', bottom: 'small' }}
            gap='medium'>
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
