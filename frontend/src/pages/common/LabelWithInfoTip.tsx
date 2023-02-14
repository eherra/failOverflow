import { Tip, Text, Box } from 'grommet';
import { StatusInfo } from 'grommet-icons';

interface ILabelWithInfoTip {
  text: string;
  tipContent: string;
  alignTipContent: any;
}

const LabelWithInfoTip = ({ text, tipContent, alignTipContent }: ILabelWithInfoTip) => {
  return (
    <Box direction='row' gap='xsmall'>
      <Text>{text}</Text>
      <Tip content={tipContent} dropProps={alignTipContent}>
        <StatusInfo />
      </Tip>
    </Box>
  );
};

export default LabelWithInfoTip;
