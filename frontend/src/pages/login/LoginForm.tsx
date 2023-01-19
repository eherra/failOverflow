import React, { useState } from 'react';
import { Box, Form, TextInput, FormField, Button, Heading } from 'grommet';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
  };

  return (
    <>
    <Heading>Login to Failoverflow</Heading>
      <Box width="30%">
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
          <Box direction="column" gap="small" pad="small">
            <Button type="submit" primary label="Sign in" />
            <Button type="reset" label="Register" />
          </Box>
        </Form>
      </Box>
    </>
  );
};

export default LoginForm;