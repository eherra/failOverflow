import { useState } from 'react';
import {
  Button,
  Box,
  CheckBox,
  Form,
  FormField,
  Header,
  Heading,
  Select,
  TextArea,
  TextInput,
} from 'grommet';
import SelectTechnologiesField from './SelectTechnologiesField';
import failureService from '../../../../api/failures';
import { useUserContext } from '../../../../context/UserContext';

interface ICreateFailureModal {
  setOpen(value: boolean): any;
}

interface ICreateFailureFormValues {
  title: string;
  description: string;
  solution: string;
  technologies?: Array<string>;
  tags?: string;
  allowComments: boolean;
}

interface IValue {
  value: ICreateFailureFormValues;
}

const CreateFailureForm = ({ setOpen }: ICreateFailureModal) => {
  const { user } = useUserContext();
  const [commentsAllowedLabel, setCommentsAllowedLabel] = useState<string>('Yes');

  const handleFormSubmit = async ({ value }: IValue) => {
    try {
      console.log(value);
      const createdFailure = await failureService.createFailure(value, user?.id || '');
      console.log(createdFailure);
    } catch (err) {
      console.log(err);
    }
    setOpen(false);
  };

  const toggleCommentAllowed = () => {
    setCommentsAllowedLabel((prevValue) => (prevValue === 'Yes' ? 'No' : 'Yes'));
  };

  return (
    <Box gap='medium'>
      <Header align='start' pad={{ horizontal: 'xxsmall' }}>
        <Box gap='xxsmall'>
          <Heading level={2} margin='none' id='layer-title'>
            Report a failure
          </Heading>
        </Box>
      </Header>
      <Form
        messages={{
          required: 'Characters here please.',
        }}
        validate='blur'
        method='post'
        onSubmit={({ value }: IValue) => handleFormSubmit({ value })}>
        <FormField required label='Title' htmlFor='title' name='title'>
          <TextInput name='title' placeholder='Short title of your failure' />
        </FormField>
        <FormField
          required
          label='Description'
          htmlFor='description'
          name='description'
          tabIndex={-1}>
          <TextArea name='description' resize='vertical' placeholder='Explain what happend' />
        </FormField>
        <FormField required label='Solution' htmlFor='solution' name='solution' tabIndex={-1}>
          <TextArea
            name='solution'
            resize='vertical'
            placeholder='How did you overcome this failure?'
          />
        </FormField>
        <SelectTechnologiesField />

        <FormField label='Tags' htmlFor='tags' name='tags'>
          <Select name='tags' options={['tag 1', 'tag 2', 'tag 3']} placeholder='Select tags' />
        </FormField>

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
          <Button label='Submit failure' primary type='submit' />
          <Button label='Cancel' onClick={() => setOpen(false)} />
        </Box>
      </Form>
    </Box>
  );
};

export default CreateFailureForm;
