import { Box, Heading, Card, CardBody, CardHeader } from 'grommet';
import { Script } from 'grommet-icons';

import ManageFailuresList from './ManageFailuresList';

const FailuresCard = () => {
  return (
    <Box gap='medium'>
      <Card margin='medium' pad='medium'>
        <CardHeader align='start' gap='xsmall'>
          <Box direction='row' gap='small'>
            <Heading level={2} size='small'>
              <Script />
              &nbsp; Manage your failures
            </Heading>
          </Box>
        </CardHeader>

        <CardBody>
          <ManageFailuresList />
        </CardBody>
      </Card>
    </Box>
  );
};

export default FailuresCard;
