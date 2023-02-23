import { Box, Spinner } from 'grommet';

const CenteredLoadingSpinner = () => {
  return (
    <Box style={{ top: '50%', left: '50%', position: 'absolute' }}>
      <Spinner size='xlarge' />
    </Box>
  );
};

export default CenteredLoadingSpinner;
