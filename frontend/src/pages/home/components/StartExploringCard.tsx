import { Link } from 'react-router-dom';
import { Card, CardHeader, Heading, CardBody, CardFooter, Button, Box, Paragraph } from 'grommet';

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
      <CardBody>
        <Paragraph size='medium' margin={{ bottom: 'medium' }}>
          Save the hassle from other developers, and start contributing your failures today! Lorem
          Nunc vel elit facilisis, lacinia eros vel, euismod magna.
        </Paragraph>
      </CardBody>
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
