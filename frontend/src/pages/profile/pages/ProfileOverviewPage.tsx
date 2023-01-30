import { PageContent, PageHeader, Grid } from 'grommet';
import PageProvider from '../../common/PageProvider';
import TechDistributionCard from '../components/OverviewPage/TechDistributionCard';
import FailuresCreatedCard from '../components/OverviewPage/FailuresCreatedCard';
import VotesReceivedCard from '../components/OverviewPage/VotesReceivedCard';
import HeaderBackLink from '../../common/HeaderBackLink';

const ProfileOverviewPage = () => {
  return (
    <PageProvider>
      <PageContent>
        <PageHeader
          parent={<HeaderBackLink label="Manage profile" link="/profile" />}
          title="Overview"
        />
          <Grid columns={{ count: 'fit', size: 'medium' }} gap="medium">
            <TechDistributionCard/>
            <FailuresCreatedCard />
            <VotesReceivedCard />
          </Grid>
      </PageContent>
    </PageProvider>
  )
}


export default ProfileOverviewPage;