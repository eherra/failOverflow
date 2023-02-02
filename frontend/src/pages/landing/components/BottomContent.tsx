import { Box, Heading, Paragraph, Button, PageContent } from 'grommet';
import { Link } from 'react-router-dom';
import { Login } from 'grommet-icons';

const BottomContent = () => {
  return (
    <PageContent>
      <Box alignSelf='center' height={{ min: 'large' }} pad={{ vertical: 'xlarge' }}>
        <Heading level={2} size='large'>
          Start contributing and make others fail faster.
        </Heading>
        <Paragraph size='xlarge'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel elit facilisis, lacinia
          eros vel, euismod magna.
        </Paragraph>
        <Box direction='row' gap='small' pad='small'>
          <Link to='/failures'>
            <Button alignSelf='start' primary label='View failures' size='large' />
          </Link>
          <Link to='/login'>
            <Button icon={<Login />} hoverIndicator label='Sign in here' size='large' />
          </Link>
        </Box>
      </Box>
    </PageContent>
  );
};

export default BottomContent;
