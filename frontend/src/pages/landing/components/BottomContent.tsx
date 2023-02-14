import { Box, Heading, Paragraph, Button, PageContent } from 'grommet';
import { Login } from 'grommet-icons';
import { Link } from 'react-router-dom';
import { WavyLink } from 'react-wavy-transitions';

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
          <WavyLink to='/login' color='#A7BEAE' duration='1000' direction='up'>
            <Button icon={<Login />} hoverIndicator label='Sign in here' size='large' />
          </WavyLink>
        </Box>
      </Box>
    </PageContent>
  );
};

export default BottomContent;
