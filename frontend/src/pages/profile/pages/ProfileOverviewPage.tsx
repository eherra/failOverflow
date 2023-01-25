import { PageContent, PageHeader } from 'grommet';
import PageProvider from '../../common/PageProvider';
import BackToManageProfileLink from '../components/BackToMangeProfileLink';

const ProfileOverviewPage = () => {
  return (
    <PageProvider>
      <PageContent>
        <PageHeader
          parent={<BackToManageProfileLink label="Manage profile" />}
          title="Overview"
        />
      </PageContent>
    </PageProvider>
  )
}

export default ProfileOverviewPage;