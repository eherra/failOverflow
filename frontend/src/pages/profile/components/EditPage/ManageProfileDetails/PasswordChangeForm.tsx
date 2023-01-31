import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  ResponsiveContext,
  TextInput,
} from 'grommet';
import { passwordRules, confirmStringMatching } from '../../../../common/FormValidation';

interface IPasswordChangeForm {
  setChangePassword(boolean: any): void
}

interface IPasswordFormValues {
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
}

const PasswordChangeForm = ({ setChangePassword }: IPasswordChangeForm) => {
  const size = useContext(ResponsiveContext);
  const [passwordValues, setPasswordValues] = useState<IPasswordFormValues>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordSubmit = (value: any, touched: any) => {
    console.log("api calls herer")
  };

  return (
    <Box
      gap="medium"
      width="medium"
      pad={{ horizontal: 'xxsmall' }}
    >
      <Form
        value={passwordValues}
        onChange={setPasswordValues}
        onSubmit={({ value, touched }) => handlePasswordSubmit(value, touched)}
        method="post"
      >
        <FormField
          required
          htmlFor="currentPassword"
          name="currentPassword"
          label="Current password"
        >
          <TextInput
            id="currentPassword"
            name="currentPassword"
            type="password"
          />
        </FormField>
        <FormField
          required
          htmlFor="newPassword"
          name="newPassword"
          label="New password"
          validate={passwordRules}
        >
          <TextInput
            name="newPassword"
            type="password"
          />
        </FormField>
        <FormField
          required
          htmlFor="confirmPassword"
          name="confirmPassword"
          label="Confirm password"
          validate={() => confirmStringMatching({
            firstString: passwordValues.newPassword,
            secondString: passwordValues.confirmPassword,
            errorText: "Passwords does not match"}
          )}
        >
          <TextInput
            name="confirmPassword"
            placeholder="Confirm new password"
            type="password"
          />
        </FormField>
        <Box
          direction='row'
          align={!['xsmall', 'small'].includes(size) ? 'start' : undefined}
          margin={{ top: 'medium', bottom: 'small' }}
          gap="small"
        >
          <Button label="Change password" primary type="submit" />
          <Button
            label="Cancel"
            onClick={() => {
              setChangePassword(false);
            }}
          />
        </Box>
      </Form>
    </Box>
  );
};

export default PasswordChangeForm;