import { useState } from 'react';
import { Button, Box, Text } from 'grommet';

interface ITruncateText {
  text: string;
}

const TruncateText = ({ text }: ITruncateText) => {
  const [viewMore, setViewMore] = useState<boolean>(false);
  const textMaxLength = 190;
  const shouldTruncate = text.length > textMaxLength;
  return (
    <Box>
      {shouldTruncate ? (
        <>{viewMore ? <Text>{text}</Text> : <Text>{text.slice(0, textMaxLength) + '...'}</Text>}</>
      ) : (
        <Text>{text}</Text>
      )}

      {shouldTruncate && (
        <Button
          plain
          style={{ textDecoration: 'underline' }}
          label={viewMore ? 'Show less' : 'Show more'}
          onClick={() => setViewMore(!viewMore)}
        />
      )}
    </Box>
  );
};

export default TruncateText;
