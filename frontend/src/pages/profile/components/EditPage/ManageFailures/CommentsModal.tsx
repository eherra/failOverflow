import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  Heading,
  Layer,
  ResponsiveContext,
  NameValuePair,
  NameValueList,
  FormField,
  CheckBox,
  Form,
} from 'grommet';
import { Chat } from 'grommet-icons';
import ShowMoreCommentsButton from '../../../../common/ShowMoreCommentsButton';

interface ICommentsModal {
  comments?: Array<string>;
  setCommentsModalShow(boolean: any): void;
}

const CommentsModal = ({ setCommentsModalShow, comments }: ICommentsModal) => {
  const size = useContext(ResponsiveContext);
  const [showAllComments, setShowAllComments] = useState<boolean>(false);
  const [commentsAllowedLabel, setCommentsAllowedLabel] = useState<string>('Yes');

  const handleFormSubmit = (value: any) => {
    // call backend with values
    console.log(value);
  };

  const toggleCommentAllowed = () => {
    setCommentsAllowedLabel((prevValue) => (prevValue === 'Yes' ? 'No' : 'Yes'));
  };

  return (
    <Layer onClickOutside={() => setCommentsModalShow(false)} onEsc={() => setCommentsModalShow(false)} modal={false}>
      <Box pad='medium' direction='row' gap='medium'>
        <Box direction='row' align='start' gap='small'>
          <Chat />
          <Heading level={2} size='small' margin='none'>
            Failure comments
          </Heading>
        </Box>
      </Box>
      <Box gap='small' margin='small'>
        <NameValueList
          pairProps={{ direction: 'column' }}
          layout='grid'
          valueProps={{ width: 'large' }}
          justifyContent='center'>
          <NameValuePair name="People's comments">
            <>
              <ul>
                {comments?.slice(0, showAllComments || comments.length < 3 ? comments.length : 3).map((comment) => (
                  <li key={comment}>{comment}</li>
                ))}
              </ul>
              {comments && comments.length >= 3 && (
                <ShowMoreCommentsButton showAll={showAllComments} setShowAll={setShowAllComments} />
              )}
            </>
          </NameValuePair>
          <NameValuePair name='Change commenting allowance'>
            <Form method='post' onSubmit={({ value }) => handleFormSubmit(value)}>
              <FormField label='Commenting allowed?' htmlFor='comments' name='comments'>
                <CheckBox
                  name='comments'
                  label={commentsAllowedLabel}
                  checked={commentsAllowedLabel === 'Yes'}
                  toggle
                  onChange={toggleCommentAllowed}
                />
              </FormField>
            </Form>
          </NameValuePair>
        </NameValueList>
      </Box>
      <Box align={['xsmall', 'small'].includes(size) ? undefined : 'end'} pad='small' gap='xsmall'>
        <Button
          label='Close details'
          onClick={() => {
            setCommentsModalShow(false);
          }}
        />
      </Box>
    </Layer>
  );
};

export default CommentsModal;
