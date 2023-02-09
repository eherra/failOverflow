import { Box, Button, Footer, Text } from 'grommet';
import { WavyLink } from 'react-wavy-transitions';

const MainFooter = () => {
  return (
    <Footer
      background='background-front'
      pad={{ horizontal: 'medium', vertical: 'small' }}
      fill='horizontal'>
      <Box gap='xsmall'>
        <Text size='medium'>&copy; {new Date().getFullYear()} Fail Overflow</Text>
      </Box>
      <Box direction='row' gap='xsmall' wrap>
        <WavyLink to='/faq' color='#dae4dd' duration='800' direction='down'>
          <Button hoverIndicator label='FAQ' />
        </WavyLink>
        <Button label='Give feedback' />
      </Box>
    </Footer>
  );
};

export default MainFooter;
