import React, { useState } from 'react';
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

interface ICreateFailureModal {
  setOpen(value: boolean): any;
}

const CreateFailureForm = ({ setOpen }: ICreateFailureModal) => {
  const [commentsAllowedLabel, setCommentsAllowedLabel] = useState<string>('Yes');

  const handleFormSubmit = (value: any) => {
    // call backend with values
    console.log(value);
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
      <Form validate='blur' method='post' onSubmit={({ value }) => handleFormSubmit(value)}>
        <FormField label='Title' htmlFor='title' name='title'>
          <TextInput name='title' placeholder='Short title of your failure' />
        </FormField>
        <FormField label='Description' htmlFor='description' name='description' tabIndex={-1}>
          <TextArea name='description' resize='vertical' placeholder='Explain what happend' />
        </FormField>
        <FormField label='Solution' htmlFor='solution' name='solution' tabIndex={-1}>
          <TextArea
            name='solution'
            resize='vertical'
            placeholder='How did you overcome this failure?'
          />
        </FormField>
        <SelectTechnologiesField />

        <FormField label='Tags' htmlFor='tags' name='tags'>
          <Select name='tags' options={['Item 1', 'Item 2', 'Item 3']} placeholder='Select tags' />
        </FormField>

        <FormField label='Comments allowed?' htmlFor='comments' name='comments'>
          <CheckBox
            name='comments'
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
