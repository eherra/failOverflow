import { Box } from 'grommet';

const FailureCardHeading = ({ heading, icon }: { heading: string; icon: JSX.Element }) => {
  return (
    <Box gap='small' direction='row'>
      {icon}
      {heading}
    </Box>
  );
};

export default FailureCardHeading;
