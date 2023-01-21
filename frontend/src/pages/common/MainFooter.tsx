import { Box, Button, Footer, Text } from 'grommet';

const MainFooter = () => {
  const currentYear = new Date().getFullYear();
  return (
    <Footer
      background="background-front"
      pad={{ horizontal: 'medium', vertical: 'small' }}
      fill="horizontal"
    >
      <Box gap="xsmall">
        <Text size="medium">
          &copy; {currentYear} Fail Overflow
        </Text>
      </Box>
      <Box
        direction="row"
        gap="xsmall"
        wrap
      >
        <Button label="FaQ" />
        <Button label="Terms" />
        <Button label="Give feedback" />
      </Box>
    </Footer>
  );
};

export default MainFooter