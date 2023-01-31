import { Link } from 'react-router-dom';
import { Card, CardHeader, Heading, CardBody, CardFooter, Button, Box } from 'grommet';

import { FormNext } from 'grommet-icons';

import CreateFailureSideModal from '../../common/CreateFailureSideModal/CreateFailureSideModal';

const StartExploringCard = () => {
  return (
    <Card margin='medium' pad='medium'>
      <CardHeader align='start' direction='column' gap='xsmall'>
        <Heading level={2} size='small'>
          Feeling like failing today?
        </Heading>
      </CardHeader>
      <CardBody>Start</CardBody>
      <CardFooter pad='small'>
        <Box direction='row' gap='small' pad='small'>
          <CreateFailureSideModal />
          <Link to='/failures'>
            <Button reverse icon={<FormNext />} hoverIndicator label='Explore failures' />
          </Link>
        </Box>
      </CardFooter>
    </Card>
  );
};

export default StartExploringCard;
