import { Grid, Page, PageContent, PageHeader } from 'grommet';
import { UserSettings, Scorecard, Edit, BarChart } from 'grommet-icons';
import PageProvider from '../common/PageProvider';
import ProfilePageCard from './components/ProfilePageCard';

const ProfilePage = () => {
  return (
    <PageProvider>
      <Page>
        <PageContent>
          <PageHeader title='Manage Profile' />
          <Grid columns={{ count: 'fit', size: 'medium' }} gap='medium'>
            <ProfilePageCard
              title='Account details'
              subtitle='View and make changes to your account and failure details'
              buttonLabel='Edit profile'
              link='edit'
              buttonIcon={<Edit />}
              icon={<UserSettings />}
            />
            <ProfilePageCard
              title='Overview'
              subtitle='View overview of your posts, reviews and votes'
              buttonLabel='See overview'
              link='overview'
              buttonIcon={<BarChart />}
              icon={<Scorecard />}
            />
          </Grid>
        </PageContent>
      </Page>
    </PageProvider>
  );
};

export default ProfilePage;
