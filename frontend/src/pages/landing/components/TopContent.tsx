import { useContext } from 'react';
import {
  Box,
  Heading,
  Paragraph,
  Grid,
  PageContent,
  Image,
  Button,
  ResponsiveContext,
} from 'grommet';
import { LinkNext } from 'grommet-icons';
import { WavyLink } from 'react-wavy-transitions';

const TopContent = () => {
  const screenSize = useContext(ResponsiveContext);

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
              Nunc vel elit facilisis, lacinia eros vel, euismod magna. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit.
            </Paragraph>
            <Box align={['xsmall', 'small'].includes(screenSize) ? undefined : 'start'}>
              <WavyLink to='/register' color='#A7BEAE' duration='1000' direction='down'>
                <Button
                  icon={<LinkNext />}
                  reverse
                  hoverIndicator
                  primary
                  label='Get started'
                  size='large'
                />
              </WavyLink>
            </Box>
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
