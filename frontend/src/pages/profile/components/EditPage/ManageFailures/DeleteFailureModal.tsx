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
import { deleteFailure } from '../../../../../api/failures';
import { IFailure } from '../../../../../types';
import { useNotificationContext } from '../../../../../context/NotificationContext';
import { useMutation, useQueryClient } from 'react-query';

interface IDeleteFailureModal {
  setDeleteModalShow(value: boolean): void;
  confirmText?: string;
  failureId?: string;
}

const DeleteFailureModal = ({
  setDeleteModalShow,
  confirmText,
  failureId,
}: IDeleteFailureModal) => {
  const { createNotification, handleErrorNotification } = useNotificationContext();
  const [value, setValue] = useState({
    deleteInput: '',
  });

  const queryClient = useQueryClient();

  const deleteFailureMutation = useMutation(deleteFailure, {
    onSuccess: () => {
      const userFailures: IFailure[] | undefined = queryClient.getQueryData('userFailures');
      queryClient.setQueryData(
        'userFailures',
        userFailures?.filter((failure: IFailure) => failure._id !== failureId),
      );
      setDeleteModalShow(false);
      createNotification({
        message: 'Failure deleted successfully!',
        isError: false,
        icon: <Trash color='#96ab9c' />,
      });
    },
    onError: (error) => {
      handleErrorNotification(error);
      setDeleteModalShow(false);
    },
  });

  const handleDeleteSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    deleteFailureMutation.mutate(failureId || '');
  };

  return (
    <Layer
      onClickOutside={() => setDeleteModalShow(false)}
      onEsc={() => setDeleteModalShow(false)}
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
              Deleting Failure
            </Heading>
          </Box>

          <Box gap='small'>
            <Notification status='critical' message='This action is permament.' />
            <FormField
              htmlFor='deleteInput'
              name='deleteField'
              label={
                <Text>
                  In order to confirm deletion, please type failure&apos;s title: <br />
                  <b>{confirmText}</b>
                </Text>
              }
              validate={() =>
                confirmStringMatching({
                  firstString: value.deleteInput,
                  secondString: confirmText || '',
                  errorText: "Confirmation doesn't match.",
                })
              }>
              <TextInput placeholder='type here...' plain name='deleteInput' />
            </FormField>
          </Box>
          <Box direction='row' gap='small' justify='end'>
            <Button
              label='Cancel'
              onClick={() => {
                setDeleteModalShow(false);
              }}
            />
            <Button
              label={deleteFailureMutation.isLoading ? 'Deleting failure...' : 'Confirm delete'}
              icon={deleteFailureMutation.isLoading ? <Spinner /> : undefined}
              primary
              type='submit'
            />
          </Box>
        </Box>
      </Form>
    </Layer>
  );
};

export default DeleteFailureModal;
