import { PageContent, PageHeader, Grid } from 'grommet';
import PageProvider from '../../common/PageProvider';
import BackToManageProfileLink from '../components/BackToMangeProfileLink';
import TechDistributionCard from '../components/OverviewPage/TechDistributionCard';
import FailuresCreatedCard from '../components/OverviewPage/FailuresCreatedCard';
import VotesReceivedCard from '../components/OverviewPage/VotesReceivedCard';

const ProfileOverviewPage = () => {
  return (
    <PageProvider>
      <PageContent>
        <PageHeader
          parent={<BackToManageProfileLink label="Manage profile" />}
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