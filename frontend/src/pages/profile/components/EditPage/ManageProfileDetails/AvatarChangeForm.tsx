import { useState, useContext } from 'react';
import { Box, Button, Form, ResponsiveContext, Spinner } from 'grommet';
import userService from '../../../../../api/user';
import AvatarForm from '../../../../auth/pages/register/components/AvatarForm';
import { useNotificationContext } from '../../../../../context/NotificationContext';
import { DocumentImage } from 'grommet-icons';
import { useUserContext } from '../../../../../context/UserContext';

interface IAvatarChangeForm {
  setChangeAvatar(boolean: any): void;
}

const AvatarChangeForm = ({ setChangeAvatar }: IAvatarChangeForm) => {
  const { createNotification, handleError } = useNotificationContext();
  const { updateAvatar } = useUserContext();
  const screenSize = useContext(ResponsiveContext);
  const [formValues, setFormValues] = useState<{ avatar: File }>();
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState<boolean>(false);

  const handleAvatarChangeSubmit = async (value: any) => {
    try {
      setIsUpdatingAvatar(true);
      const { avatarUrl } = await userService.changeAvatar(value);
      setIsUpdatingAvatar(false);
      updateAvatar(avatarUrl);
      createNotification({
        message: 'Avatar changed successfully!',
        isError: false,
        icon: <DocumentImage color='#96ab9c' />,
      });

      setChangeAvatar(false);
    } catch (err) {
      handleError(err);
      setIsUpdatingAvatar(false);
    }
  };

  return (
    <Box gap='medium' width='medium' pad={{ horizontal: 'xxsmall' }}>
      <Form
        value={formValues}
        onChange={(value) => setFormValues(value)}
        onSubmit={({ value }) => handleAvatarChangeSubmit(value)}
        method='post'>
        <AvatarForm tipContent='Max 2.5MB' />
        <Box
          align={['xsmall', 'small'].includes(screenSize) ? undefined : 'start'}
          pad={{ top: 'xxsmall' }}
          gap='small'
          direction='row'>
          <Button
            icon={isUpdatingAvatar ? <Spinner /> : undefined}
            label={isUpdatingAvatar ? 'Updating avatar' : 'Change avatar'}
            primary
            type='submit'
          />
          <Button
            label='Cancel'
            onClick={() => {
              setChangeAvatar(false);
            }}
          />
        </Box>
      </Form>
    </Box>
  );
};

export default AvatarChangeForm;
