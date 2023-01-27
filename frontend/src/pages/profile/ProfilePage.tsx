import PageProvider from '../common/PageProvider';
import ProfilePageCard from './components/ProfilePageCard';

import {
  Grid,
  Page,
  PageContent,
  PageHeader,
} from 'grommet';

import {
  UserSettings,
  Scorecard
} from 'grommet-icons';

const ProfilePage = () => {
  return (
    <PageProvider>
      <Page>
        <PageContent>
          <PageHeader
            title="Manage Profile"
          />
          <Grid columns={{ count: 'fit', size: 'medium' }} gap="medium">
            <ProfilePageCard
              title="Account details"
              subtitle="View and make changes to your account details"
              buttonLabel="Edit profile"
              link="edit"
              icon={<UserSettings />}
            />
            <ProfilePageCard
              title="Overview"
              subtitle="View overview of your posts, stars and votes"
              buttonLabel="Check overview"
              link="overview"
              icon={<Scorecard />}
            />
          </Grid>
        </PageContent>
      </Page>
    </PageProvider>
  );
};

export default ProfilePage;