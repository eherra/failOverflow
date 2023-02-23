import { useState } from 'react';
import {
  Button,
  Box,
  CheckBox,
  Form,
  FormField,
  Header,
  Heading,
  TextArea,
  TextInput,
  Spinner,
} from 'grommet';
import SelectTechnologiesField from './SelectTechnologiesField';
import failureService from '../../../../api/failures';
import { useNotificationContext } from '../../../../context/NotificationContext';
import { Script, FormPrevious } from 'grommet-icons';
import { IFailure } from '../../../../types';

interface ICreateFailureModal {
  setOpen(value: boolean): any;
}

interface ICreateFailureFormValues {
  title: string;
  description: string;
  solution: string;
  technologies?: Array<string>;
  allowComments: boolean;
}

interface IValue {
  value: ICreateFailureFormValues;
}

const CreateFailureForm = ({ setOpen }: ICreateFailureModal) => {
  const { createNotification, handleError } = useNotificationContext();

  const [commentsAllowedLabel, setCommentsAllowedLabel] = useState<string>('Yes');
  const [isCreatingFailure, setIsCreatingFailure] = useState<boolean>(false);

  const handleFormSubmit = async ({ value }: IValue) => {
    try {
      setIsCreatingFailure(true);
      const createdFailure: IFailure = await failureService.createFailure(value);
      console.log(createdFailure);
      setIsCreatingFailure(false);
      setOpen(false);
      createNotification({
        message: 'New failure created successfully!',
        isError: false,
        icon: <Script color='#96ab9c' />,
      });
    } catch (err) {
      handleError(err);
      setIsCreatingFailure(false);
    }
  };

  const toggleCommentAllowed = () => {
    setCommentsAllowedLabel((prevValue) => (prevValue === 'Yes' ? 'No' : 'Yes'));
  };

  return (
    <Box gap='medium'>
      <Header align='start' pad={{ horizontal: 'xxsmall' }}>
        <Box gap='xxsmall'>
          <Heading level={2} margin='none'>
            Report a failure
          </Heading>
        </Box>
      </Header>
      <Form
        messages={{
          required: 'Characters here please.',
        }}
        validate='submit'
        method='post'
        onSubmit={({ value }: IValue) => handleFormSubmit({ value })}>
        <FormField required label='Title' htmlFor='title' name='title'>
          <TextInput minLength={5} name='title' placeholder='Short title of your failure' />
        </FormField>
        <FormField
          required
          label='Description'
          htmlFor='description'
          name='description'
          tabIndex={-1}>
          <TextArea
            minLength={5}
            name='description'
            resize='vertical'
            placeholder='Explain what happend'
          />
        </FormField>
        <FormField required label='Solution' htmlFor='solution' name='solution' tabIndex={-1}>
          <TextArea
            minLength={5}
            name='solution'
            resize='vertical'
            placeholder='How did you overcome this failure?'
          />
        </FormField>
        <SelectTechnologiesField />

        <FormField label='Comments allowed?' htmlFor='allowComments' name='allowComments'>
          <CheckBox
            name='allowComments'
            label={commentsAllowedLabel}
            checked={commentsAllowedLabel === 'Yes'}
            toggle
            onChange={toggleCommentAllowed}
          />
        </FormField>
        <Box direction='row' gap='small' margin={{ top: 'medium', bottom: 'small' }}>
          <Button
            icon={isCreatingFailure ? <Spinner /> : undefined}
            label={isCreatingFailure ? 'Submitting failure...' : 'Submit failure'}
            primary
            type='submit'
          />
          <Button icon={<FormPrevious />} label='Cancel' onClick={() => setOpen(false)} />
        </Box>
      </Form>
    </Box>
  );
};

export default CreateFailureForm;
