import { Box, Button, Footer, Text } from 'grommet';

const MainFooter = () => {
  const year = new Date().getFullYear();
  return (
    <Footer
      background="background-front"
      pad={{ horizontal: 'medium', vertical: 'small' }}
      fill="horizontal"
    >
      <Box gap="xsmall">
        <Text size="small">
          &copy; {year} Failover Flow
        </Text>
      </Box>
      <Box
        direction="row"
        gap="xsmall"
        wrap
      >
        <Button color="#A7BEAE" label="FaQ" />
        <Button color="#A7BEAE" label="Terms" />
        <Button color="#A7BEAE" label="Give feedback" />
      </Box>
    </Footer>
  );
};

export default MainFooter