import React, { useState } from 'react';
import {
  Box,
  NameValueList,
  NameValuePair,
  Tab,
  Form,
  FormField,
  TextArea,
  Button
} from 'grommet';
import { FormDown, FormUp } from 'grommet-icons';

interface CommentTabProps {
  comments: Array<string>
}

const CommentTab = ({ comments }: CommentTabProps) => {
  const [textAreaValue, setTextAreaValue] = useState<string>("");
  const [showAllComments, setShowAllComments] = useState<boolean>(false);

  return (
    <Tab title="Comments">
      <Box gap="large" margin="large">
        <NameValueList
          pairProps={{ direction: 'column' }}
          layout="grid"
          valueProps={{ width: 'medium' }}
          justifyContent="between">
          <Form>
            <FormField
              label="Leave a comment"
              htmlFor="text-area-example"
            >
              <TextArea
                placeholder="Did you find it helpful?"
                id="text-area-example"
                value={textAreaValue}
                onChange={event => setTextAreaValue(event.target.value)}
              />
            </FormField>
            <Box direction="row" gap="medium">
              <Button type="submit" color="#A7BEAE" primary label="Send" />
            </Box>
          </Form>
          <NameValuePair name="People's comments">
            <>
              <ul>
                {comments.slice(
                  0,
                  showAllComments ||
                    comments.length < 3
                    ? comments.length
                    : 3,
                )
                  .map(comment => (
                    <li key={comment}>{comment}</li>
                  ))}
              </ul>
              {comments.length >= 3 && (
                <ShowCommentsButton
                  showAll={showAllComments}
                  setShowAll={setShowAllComments}
                />
              )}
            </>
          </NameValuePair>
        </NameValueList>
      </Box>
    </Tab>
  )
}

const ShowCommentsButton = ({ showAll, setShowAll }: any) => (
  <Button
    alignSelf="start"
    size="small"
    label={`Show ${!showAll ? 'all' : 'less'} comments`}
    onClick={() => setShowAll(() => !showAll)}
    icon={!showAll ? <FormDown /> : <FormUp />}
    reverse
  />
);

export default CommentTab;