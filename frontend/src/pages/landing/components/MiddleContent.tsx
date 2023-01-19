import { Box, Heading, Paragraph, Grid, Text, PageContent, Image } from 'grommet';

const MiddleContent = () => {
  return (
    <PageContent>
      <Box height={{ min: 'medium' }} pad={{ vertical: 'xlarge' }}>
        <Grid columns={['1/2', '1/2']}>
          <Box>
            <Heading level={2} size="large" margin="none">
              You never fail alone
            </Heading>
            <Paragraph size="xlarge" margin={{ bottom: 'none' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
              <Text size="xlarge" weight="bold">
                something
              </Text>{' '}
              ipsum dolor sit amet, consectetur adipiscing elit.
            </Paragraph>
            <Paragraph size="xlarge">
              Contribute your failures and make others fail faster.
            </Paragraph>
          </Box>
          <Box height="medium">
            <Image
              src={'/connect.svg'}
              fit="contain"
            />
          </Box>
        </Grid>
      </Box>
    </PageContent>
  );
};

export default MiddleContent;