import { Anchor, Text } from 'grommet';
import { useNavigate } from 'react-router-dom';

interface IAnchorWithText {
  text: string;
  anchorLabel: string;
  anchorLink: string;
}

const AnchorWithText = ({ text, anchorLabel, anchorLink }: IAnchorWithText) => {
  const navigate = useNavigate();

  return (
    <Text>
      {text}{' '}
      <Anchor
        label={anchorLabel}
        onClick={() => {
          navigate(anchorLink);
        }}
        style={{ color: '#5A5A5A', textDecorationLine: 'underline' }}
      />
    </Text>
  );
};

export default AnchorWithText;
