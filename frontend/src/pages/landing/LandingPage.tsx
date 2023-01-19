import { Box, Heading, Paragraph, Button, Grid, Text, PageContent } from 'grommet';
import PageProvider from '../PageProvider';

const LandingPage = () => {
  return (
    <PageProvider>
      <PageContent
        background={{
          fill: 'horizontal',
          image: 'url()',
          size: 'contain',
          position: 'left'
        }}>
        <First />
      </PageContent>

      <PageContent>
        <Second />
      </PageContent>

      <PageContent
        background={{
          fill: 'horizontal',
          image: 'url()',
          size: 'contain',
          position: 'right',
        }}>
        <Third />
      </PageContent>
    </PageProvider>
  )
};

const First = () => {
  return (
    <Box height={{ min: 'medium' }}>
      <Grid
        columns={['flex', 'large']}
        rows={['auto', 'auto']}
        areas={[
          ['empty', 'heading'],
          ['empty', 'introduction'],
        ]}
      >
        <Heading
          gridArea="heading"
          level={1}
          size="large"
          margin={{ top: 'large', bottom: 'medium' }}
        >
          Fail fast, fail often - and document it
        </Heading>
        <Box gridArea="introduction">
          <Paragraph size="xlarge" margin={{ bottom: 'medium' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel elit facilisis, lacinia eros vel,
            euismod magna. Vestibulum vestibulum massa commodo metus hendrerit commodo.
          </Paragraph>
          <Paragraph
            gridArea="introduction"
            size="xlarge"
            margin={{ bottom: 'large', top: 'none' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel elit facilisis, lacinia eros vel,
            euismod magna.
          </Paragraph>
        </Box>
      </Grid>
    </Box>
  )
}

const Second = () => {
  return (
    <Box height={{ min: 'medium' }} pad={{ vertical: 'xlarge' }}>
      <Grid columns={['1/2', '1/2']}>
        <Box>
          <Heading level={2} size="large" margin="none">
            Connect with others
          </Heading>
          <Paragraph size="xlarge" margin={{ bottom: 'none' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{' '}
            <Text size="xlarge" weight="bold">
              something
            </Text>{' '}
            ipsum dolor sit amet, consectetur adipiscing elit.
          </Paragraph>
          <Paragraph size="xlarge">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Paragraph>
        </Box>
        <Box height="medium">

        </Box>
      </Grid>
    </Box>
  );
};

const Third = () => {
  return (
    <Box
      alignSelf="center"
      height={{ min: 'large' }}
      pad={{ vertical: 'xlarge' }}
    >
      <Heading level={2} size="large" margin="none">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit
      </Heading>
      <Paragraph size="xlarge">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel elit facilisis, lacinia eros vel, euismod magna.
      </Paragraph>
      <Box direction="row" gap="small" pad="small">
        <Button alignSelf="start" color="#A7BEAE"  primary label="Start failing" size="large" />
        <Button type="submit" color="#A7BEAE" size="large" label="Sign in" />
      </Box>

    </Box>
  )
}

export default LandingPage;