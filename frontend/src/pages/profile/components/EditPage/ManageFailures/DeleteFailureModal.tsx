import React, { useState } from 'react';
import { Box, Button, TextInput, Text, Layer, Heading, FormField, Form, Notification } from 'grommet';
import { Trash } from 'grommet-icons';
import { confirmStringMatching } from '../../../../common/FormValidation';

interface IDeleteFailureModal {
  setDeleteModalShow(boolean: any): void;
  confirmText?: string;
}

const DeleteFailureModal = ({ setDeleteModalShow, confirmText }: IDeleteFailureModal) => {
  const [value, setValue] = useState({
    deleteInput: '',
  });

  const handleDeleteSubmit = (value: any) => {
    // call backend with values
    console.log(value);
  };

  return (
    <Layer onClickOutside={() => setDeleteModalShow(false)} onEsc={() => setDeleteModalShow(false)} modal={false}>
      <Form
        value={value}
        onChange={setValue}
        validate='blur'
        onSubmit={({ value }) => handleDeleteSubmit(value)}
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
            <Button primary label='Delete' type='submit' />
          </Box>
        </Box>
      </Form>
    </Layer>
  );
};

export default DeleteFailureModal;
