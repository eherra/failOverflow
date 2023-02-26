import { Link } from 'react-router-dom';
import { Card, CardHeader, Heading, CardBody, CardFooter, Button, Box, Paragraph } from 'grommet';

import { FormNext, Script } from 'grommet-icons';

import CreateFailureSideModal from '../../common/CreateFailureSideModal/CreateFailureSideModal';

const StartExploringCard = () => {
  return (
    <Card margin='medium' pad='medium'>
      <CardHeader align='start' direction='column' gap='xsmall'>
        <Heading level={1} size='small'>
          <Box gap='small' direction='row'>
            <Script />
            Feeling like failing today?
          </Box>
        </Heading>
      </CardHeader>
      <CardBody>
        <Paragraph size='medium' margin={{ bottom: 'medium' }}>
          Save the hassle from other developers and start contributing your failures today!
          Vestibulum vestibulum massa commodo metus hendrerit commodo.
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
