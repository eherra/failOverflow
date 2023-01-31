import React, { useState, useContext, useEffect } from 'react';
import { Box, List, Menu, ResponsiveContext, Text } from 'grommet';
import { More } from 'grommet-icons';
import { failureData } from '../../../../../mockData'
import { createStyledDateInfo } from '../../../../../TimeUtils';
import { Failure } from '../../../../../types';
import FailureDetailModal from './FailureDetailModal';
import CommentsModal from './CommentsModal';
import DeleteFailureModal from './DeleteFailureModal';

const ManageFailuresList = () => {
  const size = useContext(ResponsiveContext);
  const [toEdit, setToEdit] = useState<Failure | undefined>(undefined);
  const [failures, setFailures] = useState<Array<Failure>>([]);

  useEffect(() => {
    // call here to fetch failures of logged in user
    setFailures(() => failureData.failures)
  }, []);

  const [detailsModalShow, setDetailsModalShow] = useState<boolean>(false)
  const [commentsModaleShow, setCommentsModalShow] = useState<boolean>(false)
  const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false)

  return (
    <Box overflow="auto" pad="xsmall">
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
                }
              ]
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
          justify: !['xsmall', 'small'].includes(size) ? 'end' : 'center',
          pad: { top: 'xsmall' },
        }}
      >
        {/* @ts-expect-error giving error */
          (failure: Failure, index: number) => (
            <Box key={index}>
              <Text weight="bold" size="small">
                {failure.title}
              </Text>
              <Text size="small">{createStyledDateInfo(failure.timeOfCreation)}</Text>
            </Box>
          )}
      </List>

      {detailsModalShow && (
        <FailureDetailModal
          failure={toEdit}
          setDetailsModalShow={setDetailsModalShow} />
      )}

      {commentsModaleShow && (
        <CommentsModal
          comments={toEdit?.comments}
          setCommentsModalShow={setCommentsModalShow} />
      )}

      {deleteModalShow && (
        <DeleteFailureModal
          confirmText={toEdit?.title}
          setDeleteModalShow={setDeleteModalShow} />
      )}

    </Box>

  );
};

export default ManageFailuresList;