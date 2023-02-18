import { PageContent, PageHeader, Grid } from 'grommet';
import PageProvider from '../../common/PageProvider';
import TechDistributionCard from '../components/OverviewPage/TechDistribution/TechDistributionCard';
import FailuresDistributionCard from '../components/OverviewPage/FailuresDistribution/FailuresDistributionCard';
import HeaderBackLink from '../../common/HeaderBackLink';
import VotesDistributionCard from '../components/OverviewPage/VotesDistribution/VotesDistributionCard';

const ProfileOverviewPage = () => {
  return (
    <PageProvider>
      <PageContent>
        <PageHeader
          parent={<HeaderBackLink label='Manage profile' link='/profile' />}
          title='Overview'
        />
        <Grid columns={{ count: 'fit', size: 'medium' }} gap='medium'>
          <TechDistributionCard />
          <FailuresDistributionCard />
          <VotesDistributionCard />
        </Grid>
      </PageContent>
    </PageProvider>
  );
};

export default ProfileOverviewPage;
