import { PageContent, PageHeader, Grid, Box, Image } from 'grommet';
import PageProvider from '../../common/PageProvider';
import HeaderBackLink from '../../common/HeaderBackLink';
import ProfileDetailCard from '../components/EditPage/ManageProfileDetails/ProfileDetailCard';
import FailuresCard from '../components/EditPage/ManageFailures/FailuresCard';

const ProfileEditPage = () => {
  return (
    <PageProvider>
      <PageContent>
        <PageHeader
          parent={<HeaderBackLink label='Manage profile' link='/profile' />}
          title='Edit Profile'
        />
        <Grid columns={{ count: 'fit', size: 'medium' }} gap='medium'>
          <ProfileDetailCard />
          <Box height='medium'>
            <Image src={'/editProfile.svg'} fit='contain' />
          </Box>
        </Grid>
        <Grid columns={{ count: 'fit', size: 'medium' }} gap='medium'>
          <Box height='medium'>
            <Image src={'/surf.svg'} fit='contain' />
          </Box>
          <FailuresCard />
        </Grid>
      </PageContent>
    </PageProvider>
  );
};

export default ProfileEditPage;
