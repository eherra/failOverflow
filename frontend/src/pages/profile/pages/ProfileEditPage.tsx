import { PageContent, PageHeader, Grid } from 'grommet';
import PageProvider from '../../common/PageProvider';
import HeaderBackLink from '../../common/HeaderBackLink';
import ProfileDetailCard from '../components/EditPage/ProfileDetailCard';

const ProfileEditPage = () => {
  return (
    <PageProvider>
      <PageContent>
        <PageHeader
          parent={<HeaderBackLink label="Manage profile" link="/profile" />}
          title="Edit Profile"
        />
        <Grid columns={{ count: 2, size: 'medium' }} gap="medium">
          <ProfileDetailCard />

        </Grid>
      </PageContent>
    </PageProvider>
  )
}

export default ProfileEditPage;