import { Box, Button, Footer, Text } from 'grommet';
import { Link } from 'react-router-dom';
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
        <Link to='/faq'>
          <Button hoverIndicator label='FAQ' />
        </Link>
        <Button label='Give feedback' />
      </Box>
    </Footer>
  );
};

export default MainFooter;
