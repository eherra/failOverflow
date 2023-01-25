import { PageContent, PageHeader } from 'grommet';
import PageProvider from '../../common/PageProvider';
import BackToManageProfileLink from '../components/BackToMangeProfileLink';

const ProfileEditPage = () => {
  return (
    <PageProvider>
      <PageContent>
        <PageHeader
          parent={<BackToManageProfileLink label="Manage profile" />}
          title="Edit Profile"
        />
      </PageContent>
    </PageProvider>
  )
}

export default ProfileEditPage;