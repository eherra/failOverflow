import { Box, Heading, Paragraph, Grid, PageContent, Image, Button } from 'grommet';
import { Link } from 'react-router-dom';
import { Deploy } from 'grommet-icons';

const TopContent = () => {
  return (
    <PageContent>
      <Box height={{ min: 'medium' }}>
        <Grid
          columns={['flex', 'flex']}
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
              margin={{ bottom: 'medium', top: 'none' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel elit facilisis,
              lacinia eros vel, euismod magna.
            </Paragraph>
            <Link to='/register'>
              <Button icon={<Deploy />} hoverIndicator primary label='Get started' size='large' />
            </Link>
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
