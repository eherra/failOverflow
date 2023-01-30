import React, { useState, useContext } from 'react';
import { Box, List, Menu, ResponsiveContext, Text } from 'grommet';
import { More } from 'grommet-icons';
import { failureData } from '../../../../../mockData'
import { createStyledDateInfo } from '../../../../../TimeUtils';
import { Failure } from '../../../../../types';
import FailureDetailModal from './FailureDetailModal';
import CommentsModal from './CommentsModal';

const ManageFailuresList = () => {
  const size = useContext(ResponsiveContext);
  const [active, setActive] = useState<Failure | undefined>(undefined);

  const [detailsModalShow, setDetailsModalShow] = useState<boolean>(false)
  const [commentsModaleShow, setCommentsModalShow] = useState<boolean>(false)
  const [deleteModalShow, setDeleteModalShow] = useState<boolean>(false)

  return (
    <Box overflow="auto" pad="xsmall">
      <List
        data={failureData.failures}
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
                    setActive(failure);
                    setDetailsModalShow(true);
                  },
                },
                {
                  label: 'Comments',
                  onClick: () => {
                    setActive(failure);
                    setCommentsModalShow(true);
                  },
                },
              ],
              [
                {
                  label: 'Delete',
                  onClick: () => {
                    setActive(failure);
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
          failure={active}
          setDetailsModalShow={setDetailsModalShow} />
      )}

      {commentsModaleShow && (
        <CommentsModal
          comments={active?.comments}
          setCommentsModalShow={setCommentsModalShow} />
      )}


    </Box>

  );
};

export default ManageFailuresList;