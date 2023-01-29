import {
  Tip,
  Text,
  Box
} from 'grommet';

import {
  StatusInfo
} from 'grommet-icons';

interface ILabelWithInfoTip {
  text: string,
  tipContent: string
}

const LabelWithInfoTip = ({ text, tipContent }: ILabelWithInfoTip) => {
  return (
    <Box direction='row' gap='xsmall'>
      <Text>
        {text}
      </Text>
      <Tip
        content={tipContent}
        dropProps={{ align: { left: 'right' } }}
      >
        <StatusInfo />
      </Tip>
    </Box>
  )
};

export default LabelWithInfoTip;