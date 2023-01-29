import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Form,
  ResponsiveContext,
  Grid,
  Image,
} from 'grommet';

import AvatarForm from './AvatarForm';
import UsernamePasswordForm from './UsernamePasswordForm';
import UsernameTakenError from './UsernameTakenError';
import AnchorWithText from '../../../components/AnchorWithText';

const RegisterForm = () => {
  const [formValues, setFormValues] = useState()
  const [isUsernameTakenError, setIsUsernameTakenError] = useState<boolean>(false);

  const size = useContext(ResponsiveContext);

  const handleRegisterSubmit = (value: any, touched: any) => {
    console.log("perkele")
    // call api to save user here
    // if error, set Error to setIsUsernameTakenError
  };

  return (
    <Grid columns={{ count: "fit", size: 'medium' }} gap="xxsmall">
      <Box gap="medium" width="medium">
        <Box
          pad={{ horizontal: 'xxsmall' }}
        >
          <Form
            messages={{
              required: 'This is a required field.',
            }}
            onSubmit={({ value, touched }) => handleRegisterSubmit(value, touched)}
            value={formValues}
            onChange={(value) => setFormValues(value)}
            method="post"
          >
            <UsernamePasswordForm />
            <AvatarForm />
            <UsernameTakenError
              isUsernameTaken={isUsernameTakenError}
            />
            <Box
              align={['xsmall', 'small'].includes(size) ? undefined : 'start'}
              pad={{ top: 'xxsmall' }}
              gap="small"
            >
              <Button label="Register account" primary type="submit" />
              <AnchorWithText
                text="Already user? "
                anchorLabel="Sign in here"
                anchorLink="/login" />
            </Box>
          </Form>
        </Box>
      </Box>
      <Box height="medium">
        <Image
          src={"/loginRegister/surf2.svg"}
          fit="contain"
        />
      </Box>
    </Grid>
  );
};

export default RegisterForm;