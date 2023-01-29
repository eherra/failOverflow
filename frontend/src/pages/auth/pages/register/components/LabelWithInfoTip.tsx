import {
  Tip,
  Text,
  Box
} from 'grommet';

import {
  StatusInfo
} from 'grommet-icons';

const LabelWithInfoTip = () => {
  return (
    <Box direction='row' gap='xsmall'>
      <Text>
        Upload avatar
      </Text>
      <Tip
        content="Can be added/edited later"
        dropProps={{ align: { left: 'right' } }}
      >
        <StatusInfo />
      </Tip>
    </Box>
  )
};

export default LabelWithInfoTip;