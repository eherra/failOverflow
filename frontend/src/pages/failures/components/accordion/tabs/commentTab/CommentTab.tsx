import { useState, SyntheticEvent } from 'react';
import { Box, NameValueList, Tab, Form, FormField, TextArea, Button, Text, Spinner } from 'grommet';
import failureService, { addCommentToFailure } from '../../../../../../api/failures';
import { Login, ChatOption, Chat } from 'grommet-icons';
import { useUserContext } from '../../../../../../context/UserContext';
import UserCommentsColumn from '../../../../../common/Comments/UserCommentsColumn';
import { useNotificationContext } from '../../../../../../context/NotificationContext';
import { WavyLink } from 'react-wavy-transitions';
import LabelWithInfoTip from '../../../../../common/LabelWithInfoTip';
import { IListComment } from '../../../../../../types';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import DataFetchErrorMessage from '../../../../../common/DataFetchErrorMessage';

interface ICommentTab {
  failureId: string;
  allowComments: boolean;
}

const CommentTab = ({ failureId, allowComments }: ICommentTab) => {
  const { user } = useUserContext();
  const { createNotification, handleErrorNotification } = useNotificationContext();
  const [commentInput, setCommentInput] = useState<string>('');
  const queryClient = useQueryClient();

  const { data, error } = useQuery<IListComment[], Error>(
    ['comments', failureId],
    async () => fetchCommentsData(),
    {
      refetchOnWindowFocus: false,
    },
  );

  const fetchCommentsData = async () => {
    try {
      const { commentsData } = await failureService.getFailureComments(failureId);
      return commentsData;
    } catch (err) {
      handleErrorNotification(err);
    }
  };

  const newCommentMutation = useMutation(addCommentToFailure, {
    onSuccess: (data) => {
      const { createdComment } = data;
      const comments: IListComment[] | undefined = queryClient.getQueryData([
        'comments',
        failureId,
      ]);
      createdComment.username = user?.username;
      createdComment.avatarUrl = user?.avatarUrl;
      queryClient.setQueryData(['comments', failureId], [createdComment, ...(comments || [])]);
      createNotification({
        message: 'Comment added succesfully!',
        isError: false,
        icon: <ChatOption color='#96ab9c' />,
      });
      setCommentInput('');
    },
    onError: (error) => {
      handleErrorNotification(error);
      setCommentInput('');
    },
  });

  const handleCommentSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    newCommentMutation.mutate({ comment: commentInput, failureId: failureId });
  };

  return (
    <Tab title='Comments' icon={<Chat />}>
      <Box gap='large' margin='large'>
        <NameValueList
          pairProps={{ direction: 'column' }}
          layout='grid'
          valueProps={{ width: 'medium' }}
          justifyContent='center'>
          {!user ? (
            <Box align='start' pad={{ top: 'small', bottom: 'small' }} gap='small'>
              <Text weight='bold' size='medium'>
                Sign in to leave a comment
              </Text>
              <WavyLink to='/login' color='#A7BEAE' duration='1000' direction='down'>
                <Button icon={<Login />} primary hoverIndicator label='Sign in here' />
              </WavyLink>
            </Box>
          ) : (
            <>
              {allowComments ? (
                <Form onSubmit={handleCommentSubmit}>
                  <FormField label='Leave a comment' htmlFor='textArea'>
                    <TextArea
                      required
                      placeholder='e.g. did you find it helpful?'
                      name='commentInput'
                      id='textArea'
                      maxLength={300}
                      value={commentInput}
                      onChange={(event) => setCommentInput(event.target.value)}
                    />
                  </FormField>
                  <Box direction='row' gap='medium'>
                    <Button
                      icon={newCommentMutation.isLoading ? <Spinner /> : undefined}
                      label={newCommentMutation.isLoading ? 'Sending' : 'Send'}
                      primary
                      type='submit'
                    />
                  </Box>
                </Form>
              ) : (
                <Box direction='row' pad={{ top: 'small', bottom: 'small' }} gap='small'>
                  <LabelWithInfoTip
                    text='Commenting not allowed.'
                    tipContent='User has denied commenting for the failure.'
                    alignTipContent={{ align: { bottom: 'top' } }}
                  />
                </Box>
              )}
            </>
          )}

          {error ? <DataFetchErrorMessage /> : <UserCommentsColumn comments={data} />}
        </NameValueList>
      </Box>
    </Tab>
  );
};

export default CommentTab;
