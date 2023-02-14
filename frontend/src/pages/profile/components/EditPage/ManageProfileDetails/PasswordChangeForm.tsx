import { useState, useContext } from 'react';
import { Box, Button, Form, FormField, ResponsiveContext, TextInput, Spinner } from 'grommet';
import { passwordRules, confirmStringMatching } from '../../../../common/FormValidation';
import userService from '../../../../../api/user';
import { IPasswordChangeFormValues } from '../../../../../types';
import { useUserContext } from '../../../../../context/UserContext';
import { useNotificationContext } from '../../../../../context/NotificationContext';
import { Lock } from 'grommet-icons';

interface IPasswordChangeForm {
  setChangePassword(boolean: unknown): void;
}

const PasswordChangeForm = ({ setChangePassword }: IPasswordChangeForm) => {
  const { user } = useUserContext();
  const { createNotification } = useNotificationContext();
  const screenSize = useContext(ResponsiveContext);

  const [isUpdatingPassword, setIsUpdatingPassword] = useState<boolean>(false);
  const [passwordValues, setPasswordValues] = useState<IPasswordChangeFormValues>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handlePasswordSubmit = async (value: IPasswordChangeFormValues) => {
    try {
      setIsUpdatingPassword(true);
      await userService.changePassword({ passwordValues: value, id: user?.id });
      setIsUpdatingPassword(false);
      createNotification({
        message: 'Password changed successfully!',
        isError: false,
        icon: <Lock />,
      });
      setPasswordValues({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setChangePassword(false);
    } catch (err) {
      console.log(err);
      setIsUpdatingPassword(false);
      createNotification({ message: 'Something went wrong! Try again later.', isError: true });
      setPasswordValues({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }
  };

  return (
    <Box gap='medium' width='medium' pad={{ horizontal: 'xxsmall' }}>
      <Form
        value={passwordValues}
        onChange={setPasswordValues}
        onSubmit={({ value }) => handlePasswordSubmit(value)}
        method='post'>
        <FormField
          required
          htmlFor='currentPassword'
          name='currentPassword'
          label='Current password'>
          <TextInput id='currentPassword' name='currentPassword' type='password' />
        </FormField>
        <FormField
          required
          htmlFor='newPassword'
          name='newPassword'
          label='New password'
          validate={passwordRules}>
          <TextInput name='newPassword' type='password' />
        </FormField>
        <FormField
          required
          htmlFor='confirmPassword'
          name='confirmPassword'
          label='Confirm password'
          validate={() =>
            confirmStringMatching({
              firstString: passwordValues.newPassword,
              secondString: passwordValues.confirmPassword,
              errorText: 'Passwords does not match',
            })
          }>
          <TextInput name='confirmPassword' placeholder='Confirm new password' type='password' />
        </FormField>
        <Box
          direction='row'
          align={!['xsmall', 'small'].includes(screenSize) ? 'start' : undefined}
          margin={{ top: 'medium', bottom: 'small' }}
          gap='small'>
          <Button
            label={isUpdatingPassword ? 'Updating password...' : 'Change password'}
            icon={isUpdatingPassword ? <Spinner /> : undefined}
            primary
            type='submit'
          />
          <Button
            label='Cancel'
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
