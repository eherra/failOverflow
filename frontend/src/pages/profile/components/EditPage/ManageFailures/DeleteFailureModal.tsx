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
import failureService from '../../../../../api/failures';
import { Failure } from '../../../../../types';
import { useNotificationContext } from '../../../../../context/NotificationContext';

interface IDeleteFailureModal {
  setDeleteModalShow(boolean: any): void;
  setFailures(failures: Array<Failure>): void;
  confirmText?: string;
  failureId?: string;
}

const DeleteFailureModal = ({
  setDeleteModalShow,
  confirmText,
  failureId,
  setFailures,
}: IDeleteFailureModal) => {
  const { createNotification, handleError } = useNotificationContext();
  const [isDeletingFailure, setIsDeletingFailure] = useState<boolean>(false);
  const [value, setValue] = useState({
    deleteInput: '',
  });

  const handleDeleteSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      setIsDeletingFailure(true);
      await failureService.deleteFailure(failureId || '');
      /* @ts-expect-error TODO check this */
      setFailures((failures: Array<Failure>) =>
        failures.filter((failure: Failure) => failure._id !== failureId),
      );
      setIsDeletingFailure(false);
      setDeleteModalShow(false);
      createNotification({
        message: 'Failure deleted successfully!',
        isError: false,
        icon: <Trash color='#96ab9c' />,
      });
    } catch (err) {
      handleError(err);
      setIsDeletingFailure(false);
      setDeleteModalShow(false);
    }
  };

  return (
    <Layer
      onClickOutside={() => setDeleteModalShow(false)}
      onEsc={() => setDeleteModalShow(false)}
      modal={false}>
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
              <TextInput plain name='deleteInput' />
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
              label={isDeletingFailure ? 'Deleting failure...' : 'Confirm delete'}
              icon={isDeletingFailure ? <Spinner /> : undefined}
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
