import { Page, PageContent, PageHeader } from 'grommet';
import PageProvider from '../../common/PageProvider';

const ProfileEditPage = () => {
  return (
    <PageProvider>
      <PageContent>
        <PageHeader
          title="Edit Profile"
        />
      </PageContent>
    </PageProvider>
  )
}

export default ProfileEditPage;