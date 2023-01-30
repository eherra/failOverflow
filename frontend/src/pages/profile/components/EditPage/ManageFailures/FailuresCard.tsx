import {
  Box,
  Heading,
  Card,
  CardBody,
  CardHeader,
} from 'grommet';

import ManageFailuresList from './ManageFailuresList';

const FailuresCard = () => {
  return (
    <Box gap="medium">
      <Card
        margin="medium"
        pad="medium"
      >
        <CardHeader align="start" direction="column" gap="xsmall">
          <Heading level={2} size="small">
            Manage your Failures
          </Heading>
        </CardHeader>

        <CardBody>
          <ManageFailuresList />
        </CardBody>

      </Card>
    </Box>
  );
};

export default FailuresCard;