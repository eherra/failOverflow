import React, { useState, useContext } from 'react';
import { Box, Form, TextInput, FormField, Button, Grid, Image, ResponsiveContext, Anchor, Text } from 'grommet';
import { useNavigate } from 'react-router-dom';
import AnchorWithText from '../../../components/AnchorWithText';

const LoginForm = () => {
  const navigate = useNavigate();
  const size = useContext(ResponsiveContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  return (
    <Grid columns={{ count: 2, size: 'medium' }} gap="medium">
      <Form>
        <Box direction="row" gap="large" pad="small">
          <FormField name="name" htmlFor="username" label="Username">
            <TextInput
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </FormField>
          <FormField name="password" htmlFor="password" label="Password">
            <TextInput
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormField>
        </Box>
        <Box
          align={['xsmall', 'small'].includes(size) ? undefined : 'start'}
          pad={{ top: 'small' }}
          gap="small"
        >
          <Button label="Sign in" primary type="submit" />
          <AnchorWithText
            text="No account? "
            anchorLabel="Register user here."
            anchorLink="/register" />
        </Box>
      </Form>
      <Box height="medium">
        <Image
          src={"/loginRegister/login.svg"}
          fit="contain"
        />
      </Box>
    </Grid>
  );
};

export default LoginForm;