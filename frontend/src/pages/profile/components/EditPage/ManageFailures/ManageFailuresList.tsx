import { useState, useContext, useEffect } from 'react';
import { Box, List, Menu, ResponsiveContext, Text, Spinner } from 'grommet';
import { More } from 'grommet-icons';
import { createStyledDateInfo } from '../../../../../utils/timeUtils';
import { IFailure } from '../../../../../types';
import FailureDetailModal from '../../../../common/FailureDetailModal';
import CommentsModal from './CommentsModal';
import DeleteFailureModal from './DeleteFailureModal';
import failureService from '../../../../../api/failures';
import CreateFailureSideModal from '../../../../common/CreateFailureSideModal/CreateFailureSideModal';
import { useNotificationContext } from '../../../../../context/NotificationContext';
import { useQuery } from 'react-query';

const ManageFailuresList = () => {
  const screenSize = useContext(ResponsiveContext);
  const { handleErrorNotification } = useNotificationContext();

  const [detailsModalShow, setDetailsModalShow] = useState<boolean>(false);
  const [commentsModaleShow, setCommentsModalShow] = useState<boolean>(false);
  const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
  const [toEdit, setToEdit] = useState<IFailure | undefined>();

  const [failures, setFailures] = useState<Array<IFailure>>([]);

  const { data, error, isFetching } = useQuery<IFailure[], Error>(
    'userFailures',
    async () => fetchUsersFailures(),
    {
      refetchOnWindowFocus: false,
    },
  );

  const fetchUsersFailures = async () => {
    try {
      const { userFailures } = await failureService.getUsersFailures();
      return userFailures;
    } catch (err) {
      handleErrorNotification(err);
    }
  };

  // TODO: better error message
  if (error) {
    return <p>Could not fetch failures of user.</p>;
  }

  if (isFetching) {
    return <Spinner size='large' />;
  }

  return (
    <Box overflow='auto' pad='xsmall'>
      {data?.length ? (
        <>
          <List
            data={data}
            action={(failure, index) => (
              <Menu
                key={index}
                icon={<More />}
                hoverIndicator
                items={[
                  [
                    {
                      label: 'View details',
                      onClick: () => {
                        setToEdit(failure);
                        setDetailsModalShow(true);
                      },
                    },
                    {
                      label: 'Comments',
                      onClick: () => {
                        setToEdit(failure);
                        setCommentsModalShow(true);
                      },
                    },
                  ],
                  [
                    {
                      label: 'Delete',
                      onClick: () => {
                        setToEdit(failure);
                        setDeleteModalShow(true);
                      },
                    },
                  ],
                ]}
              />
            )}
            step={2}
            show={{ page: 1 }}
            paginate={{
              /* @ts-expect-error doesn't recognize the paginate props as an Object */
              border: 'top',
              direction: 'row',
              fill: 'horizontal',
              justify: !['xsmall', 'small'].includes(screenSize) ? 'end' : 'center',
              pad: { top: 'xsmall' },
            }}>
            {
              /* @ts-expect-error giving error */
              (failure: Failure, index: number) => (
                <Box key={index}>
                  <Text weight='bold' size='small'>
                    {failure.title}
                  </Text>
                  <Text size='small'>{createStyledDateInfo(failure.createdAt)}</Text>
                </Box>
              )
            }
          </List>
          {detailsModalShow && (
            <FailureDetailModal failure={toEdit} setDetailsModalShow={setDetailsModalShow} />
          )}

          {commentsModaleShow && (
            <CommentsModal
              failureId={toEdit?._id}
              allowComments={toEdit?.allowComments}
              setCommentsModalShow={setCommentsModalShow}
              setFailures={setFailures}
            />
          )}

          {deleteModalShow && (
            <DeleteFailureModal
              failureId={toEdit?._id}
              confirmText={toEdit?.title}
              setDeleteModalShow={setDeleteModalShow}
            />
          )}
        </>
      ) : (
        <Box direction='column'>
          <p>No failures created by you.</p>
          <Box align={['xsmall', 'small'].includes(screenSize) ? undefined : 'start'}>
            <CreateFailureSideModal />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ManageFailuresList;
