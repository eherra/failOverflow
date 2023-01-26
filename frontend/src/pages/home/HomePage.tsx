import PageProvider from '../common/PageProvider';
import { PageContent, Box, Image, PageHeader, Grid } from "grommet";
import VoteOfTheWeekCard from './components/VoteOfTheWeekCard';
import MostLikedFailureCard from './components/MostLikedFailureCard';
import StartExploringCard from './components/StartExploringCard';

const userName = "John Wilkes"

const HomePage = () => {
  const helloUser = `Hello, ${userName}`
  return (
    <PageProvider>
      <PageContent>
        <PageHeader
          title={helloUser}
          subtitle="Welcome to Failover Flow"
        />
        <Grid columns={{ count: 'fit', size: 'medium' }} gap="medium">
          <Box height="medium">
            <Image
              src={'/explore.svg'}
              fit="contain"
            />
          </Box>
          <StartExploringCard />
        </Grid>

        <Grid columns={{ count: 'fit', size: 'medium' }} gap="medium">
          <VoteOfTheWeekCard />
          <Box height="medium">
            <Image
              src={'/votevote.svg'}
              fit="contain"
            />
          </Box>
        </Grid>

        <Grid columns={{ count: 'fit', size: 'medium' }} gap="medium">
          <Box height="medium">
            <Image
              src={'/heart.svg'}
              fit="contain"
            />
          </Box>
          <MostLikedFailureCard />
        </Grid>
      </PageContent>
    </PageProvider>
  );
};

export default HomePage;