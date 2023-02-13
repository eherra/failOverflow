import { useState, useContext, useEffect } from 'react';
import { Box, List, Menu, ResponsiveContext, Text, Spinner } from 'grommet';
import { More } from 'grommet-icons';
import { createStyledDateInfo } from '../../../../../utils/TimeUtils';
import { Failure } from '../../../../../types';
import FailureDetailModal from '../../../../common/FailureDetailModal';
import CommentsModal from './CommentsModal';
import DeleteFailureModal from './DeleteFailureModal';
import failureService from '../../../../../api/failures';
import { useUserContext } from '../../../../../context/UserContext';

const ManageFailuresList = () => {
  const { user } = useUserContext();
  const screenSize = useContext(ResponsiveContext);

  const [detailsModalShow, setDetailsModalShow] = useState<boolean>(false);
  const [commentsModaleShow, setCommentsModalShow] = useState<boolean>(false);
  const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false);
  const [toEdit, setToEdit] = useState<Failure | undefined>();

  const [failures, setFailures] = useState<Array<Failure>>([]);
  const [isFetchingFailures, setIsFetchingFailures] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsersFailures = async () => {
      try {
        setIsFetchingFailures(true);
        const userDbFailures = await failureService.getUsersFailuresById(user?.id || '');
        setFailures(userDbFailures.userFailures);
        setIsFetchingFailures(false);
      } catch (err) {
        console.log(err);
        setIsFetchingFailures(false);
        setIsError(true);
      }
    };

    fetchUsersFailures();
  }, []);

  // TODO: better error message
  if (isError) {
    return <p>Could not fetch failures of user</p>;
  }

  if (isFetchingFailures) {
    return <Spinner size='large' />;
  }

  return (
    <Box overflow='auto' pad='xsmall'>
      <List
        data={failures}
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
          comments={toEdit?.comments}
          allowComments={toEdit?.allowComments}
          setCommentsModalShow={setCommentsModalShow}
        />
      )}

      {deleteModalShow && (
        <DeleteFailureModal
          failureId={toEdit?._id}
          setFailures={setFailures}
          confirmText={toEdit?.title}
          setDeleteModalShow={setDeleteModalShow}
        />
      )}
    </Box>
  );
};

export default ManageFailuresList;
