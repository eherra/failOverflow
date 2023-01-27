import React, { useContext, useState } from 'react';
import {
  Button,
  Box,
  Layer,
  ResponsiveContext
} from 'grommet';

import {
  Add
} from 'grommet-icons';

import CreateFailureForm from './form/CreateFailureForm';

const CreateFailureSideModal = () => {
  const [isCreateFailureModalOpen, setIsCreateFailureModalOpen] = useState<boolean>(false);
  const size = useContext(ResponsiveContext);

  return (
    <>
      <Box>
        <Button
          primary
          hoverIndicator
          icon={<Add />}
          label="Create a failure"
          onClick={() => setIsCreateFailureModalOpen(true)} />
      </Box>
      {isCreateFailureModalOpen && (
        <Layer
          position="right"
          full={['xsmall', 'small'].includes(size) ? true : 'vertical'}
          onEsc={() => setIsCreateFailureModalOpen(false)}
        >
          <Box
            fill="vertical"
            overflow="auto"
            width={['xsmall', 'small'].includes(size) ? undefined : 'medium'}
            pad="medium"
          >
            <CreateFailureForm setOpen={value => setIsCreateFailureModalOpen(value)} />
          </Box>
        </Layer>
      )}
    </>
  );
};

export default CreateFailureSideModal