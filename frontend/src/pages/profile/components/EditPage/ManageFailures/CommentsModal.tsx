import { useState, useContext } from 'react';
import {
  Box,
  Button,
  Heading,
  Layer,
  ResponsiveContext,
  NameValuePair,
  NameValueList,
  CheckBox,
} from 'grommet';
import { Chat } from 'grommet-icons';
import failureService, { toggleCommentAllowed } from '../../../../../api/failures';
import UserCommentsColumn from '../../../../common/Comments/UserCommentsColumn';
import { IFailure, IListComment } from '../../../../../types';
import { useNotificationContext } from '../../../../../context/NotificationContext';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import DataFetchErrorMessage from '../../../../common/DataFetchErrorMessage';

interface ICommentsModal {
  allowComments?: boolean;
  failureId: string;
  setCommentsModalShow(value: boolean): void;
}

const CommentsModal = ({ allowComments, failureId, setCommentsModalShow }: ICommentsModal) => {
  const screenSize = useContext(ResponsiveContext);
  const { handleErrorNotification } = useNotificationContext();
  const allowCommentsText = allowComments ? 'Yes' : 'No';
  const [commentsAllowedLabel, setCommentsAllowedLabel] = useState<string>(allowCommentsText);
  const queryClient = useQueryClient();

  const { data, error } = useQuery<IListComment[], Error>(
    ['comments', failureId],
    async () => fetchCommentsData(),
    {
      refetchOnWindowFocus: false,
    },
  );

  const toggleCommentMutation = useMutation(toggleCommentAllowed, {
    onSuccess: () => {
      setCommentsAllowedLabel((prevValue) => (prevValue === 'Yes' ? 'No' : 'Yes'));
      const userFailures: IFailure[] | undefined = queryClient.getQueryData('userFailures');
      queryClient.setQueryData(
        'userFailures',
        userFailures?.map((mFailure: IFailure) => {
          if (mFailure._id === failureId) {
            return { ...mFailure, allowComments: !mFailure.allowComments };
          }
          return mFailure;
        }),
      );
    },
    onError: (error) => {
      handleErrorNotification(error);
    },
  });

  const fetchCommentsData = async () => {
    const { commentsData } = await failureService.getFailureComments(failureId || '');
    return commentsData;
  };

  const toggleCommentAllowedD = (toggleValue: boolean) => {
    toggleCommentMutation.mutate({ failureId: failureId || '', isCommentsAllowed: !toggleValue });
  };

  const isCommentsChecked = commentsAllowedLabel === 'Yes';

  return (
    <Layer
      onClickOutside={() => setCommentsModalShow(false)}
      onEsc={() => setCommentsModalShow(false)}
      modal={true}
      style={{ overflow: 'auto' }}>
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
          {error ? <DataFetchErrorMessage /> : <UserCommentsColumn comments={data} />}
          <NameValuePair name='Allow commenting?'>
            <CheckBox
              name='comments'
              label={commentsAllowedLabel}
              checked={isCommentsChecked}
              toggle
              onClick={() => toggleCommentAllowedD(isCommentsChecked)}
            />
          </NameValuePair>
        </NameValueList>
        <Box
          align={['xsmall', 'small'].includes(screenSize) ? undefined : 'end'}
          pad='small'
          gap='xsmall'>
          <Button
            label='Close details'
            onClick={() => {
              setCommentsModalShow(false);
            }}
          />
        </Box>
      </Box>
    </Layer>
  );
};

export default CommentsModal;
