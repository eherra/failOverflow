import { Box } from 'grommet';
import LabelWithInfoTip from '../../common/LabelWithInfoTip';

const FailureCardHeading = ({ heading, tipContent }: { heading: string; tipContent: string }) => {
  return (
    <Box direction='row'>
      {heading}
      <LabelWithInfoTip tipContent={tipContent} alignTipContent={{ align: { bottom: 'right' } }} />
    </Box>
  );
};

export default FailureCardHeading;
