import { Box, Text } from 'grommet';
import { Alert } from 'grommet-icons';

const DataFetchErrorMessage = () => {
  return (
    <Box direction='row' gap='small'>
      <Alert />
      <Text>Something went wrong while fetching data. Try again later.</Text>
    </Box>
  );
};

export default DataFetchErrorMessage;
