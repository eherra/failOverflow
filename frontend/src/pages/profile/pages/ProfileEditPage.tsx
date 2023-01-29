import { PageContent, PageHeader } from 'grommet';
import PageProvider from '../../common/PageProvider';
import HeaderBackLick from '../../common/HeaderBackLink';

const ProfileEditPage = () => {
  return (
    <PageProvider>
      <PageContent>
        <PageHeader
          parent={<HeaderBackLick label="Manage profile" link="/profile" />}
          title="Edit Profile"
        />
      </PageContent>
    </PageProvider>
  )
}

export default ProfileEditPage;