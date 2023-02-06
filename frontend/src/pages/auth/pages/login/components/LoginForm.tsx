import { useState, useContext } from 'react';
import { Box, Form, TextInput, FormField, Button, Grid, Image, ResponsiveContext } from 'grommet';
import { useNavigate } from 'react-router-dom';
import AnchorWithText from '../../../components/AnchorWithText';
import { ILoginValues } from '../../../../../types';
import useAuth from '../../../../../hooks/useAuth';

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState<ILoginValues>();
  const screenSize = useContext(ResponsiveContext);

  const handleLoginSubmit = (value: ILoginValues) => {
    console.log(value);
    try {
      login(value);
      navigate('/');
    } catch (e) {
      console.log('yolo');
      console.log(e);
    }
  };

  return (
    <Grid columns={{ count: 'fit', size: 'medium' }} gap='medium'>
      <Form
        messages={{
          required: 'Characters here please.',
        }}
        onSubmit={({ value }) => handleLoginSubmit(value)}
        value={formValues}
        onChange={(value) => setFormValues(value)}
        method='post'>
        <Box direction='row' gap='large' pad='small'>
          <FormField required name='username' htmlFor='username' label='Username'>
            <TextInput name='username' />
          </FormField>
          <FormField required name='password' htmlFor='password' label='Password'>
            <TextInput type='password' name='password' />
          </FormField>
        </Box>
        <Box
          align={['xsmall', 'small'].includes(screenSize) ? undefined : 'start'}
          pad={{ top: 'small' }}
          gap='small'>
          <Button label='Sign in' primary type='submit' />
          <AnchorWithText
            text='No account? '
            anchorLabel='Register user here'
            anchorLink='/register'
          />
        </Box>
      </Form>
      <Box height='medium'>
        <Image src={'/loginRegister/login.svg'} fit='contain' />
      </Box>
    </Grid>
  );
};

export default LoginForm;
