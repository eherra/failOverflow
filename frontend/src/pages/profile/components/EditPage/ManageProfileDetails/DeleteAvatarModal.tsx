import { SyntheticEvent, useState } from 'react';
import {
  Box,
  Button,
  TextInput,
  Text,
  Layer,
  Heading,
  FormField,
  Form,
  Notification,
  Spinner,
} from 'grommet';
import { Trash } from 'grommet-icons';
import { confirmStringMatching } from '../../../../common/FormValidation';
import { useNotificationContext } from '../../../../../context/NotificationContext';
import userService from '../../../../../api/user';
import { useUserContext } from '../../../../../context/UserContext';

interface IDeleteAvatarModal {
  setDeleteAvatarModalShow(boolean: any): void;
}

const DeleteAvatarModal = ({ setDeleteAvatarModalShow }: IDeleteAvatarModal) => {
  const { createNotification, handleErrorNotification } = useNotificationContext();
  const { updateAvatarToUser } = useUserContext();
  const [isDeletingAvatar, setIsDeletingAvatar] = useState<boolean>(false);
  const [value, setValue] = useState({
    deleteInput: '',
  });

  const handleDeleteSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      setIsDeletingAvatar(true);
      await userService.deleteAvatar();
      setIsDeletingAvatar(false);
      setDeleteAvatarModalShow(false);
      updateAvatarToUser(null);
      createNotification({
        message: 'Avatar deleted successfully!',
        isError: false,
        icon: <Trash color='#96ab9c' />,
      });
    } catch (err) {
      handleErrorNotification(err);
      setIsDeletingAvatar(false);
      setDeleteAvatarModalShow(false);
    }
  };

  return (
    <Layer
      onClickOutside={() => setDeleteAvatarModalShow(false)}
      onEsc={() => setDeleteAvatarModalShow(false)}
      modal={true}>
      <Form
        value={value}
        onChange={setValue}
        validate='blur'
        onSubmit={handleDeleteSubmit}
        method='post'>
        <Box gap='medium' pad='medium'>
          <Box direction='row' align='start' gap='small'>
            <Trash />
            <Heading level={2} size='small' margin='none'>
              Deleting Avatar
            </Heading>
          </Box>

          <Box gap='small'>
            <Notification status='critical' message='This action is permament.' />
            <FormField
              htmlFor='deleteInput'
              name='deleteField'
              label={
                <Text>
                  In order to confirm deletion, please type below: <b>avatar</b>
                </Text>
              }
              validate={() =>
                confirmStringMatching({
                  firstString: value.deleteInput,
                  secondString: 'avatar',
                  errorText: "Confirmation doesn't match.",
                })
              }>
              <TextInput plain name='deleteInput' />
            </FormField>
          </Box>
          <Box direction='row' gap='small' justify='end'>
            <Button
              label='Cancel'
              onClick={() => {
                setDeleteAvatarModalShow(false);
              }}
            />
            <Button
              label={isDeletingAvatar ? 'Deleting avatar...' : 'Confirm delete'}
              icon={isDeletingAvatar ? <Spinner /> : undefined}
              primary
              type='submit'
            />
          </Box>
        </Box>
      </Form>
    </Layer>
  );
};

export default DeleteAvatarModal;
