import { Box, Button, Footer, Text, Tip, Image } from 'grommet';
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
        <WavyLink to='/faq' color='#A7BEAE' duration='1000' direction='down'>
          <Button hoverIndicator label='FAQ' />
        </WavyLink>
        <Tip
          content={
            <Box pad='small'>
              <Image src={'/work.gif'} height='200px' width='250px' />
            </Box>
          }>
          <Button label='Careers' />
        </Tip>
      </Box>
    </Footer>
  );
};

export default MainFooter;
