import { Box, Heading, Paragraph, Grid, PageContent, Image } from 'grommet';

const TopContent = () => {
  return (
    <PageContent>
      <Box height={{ min: 'medium' }}>
        <Grid
          columns={['flex', 'large']}
          rows={['auto', 'auto']}
          areas={[
            ['empty', 'heading'],
            ['svg', 'introduction'],
          ]}>
          <Heading
            gridArea='heading'
            level={1}
            size='large'
            margin={{ top: 'large', bottom: 'medium' }}>
            Fail fast, fail often - and document it
          </Heading>
          <Box gridArea='introduction'>
            <Paragraph size='xlarge' margin={{ bottom: 'medium' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel elit facilisis,
              lacinia eros vel, euismod magna. Vestibulum vestibulum massa commodo metus hendrerit
              commodo.
            </Paragraph>
            <Paragraph
              gridArea='introduction'
              size='xlarge'
              margin={{ bottom: 'large', top: 'none' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel elit facilisis,
              lacinia eros vel, euismod magna.
            </Paragraph>
          </Box>
          <Box gridArea='svg'>
            <Image src={'/landingpage/time.svg'} />
          </Box>
        </Grid>
      </Box>
    </PageContent>
  );
};

export default TopContent;
