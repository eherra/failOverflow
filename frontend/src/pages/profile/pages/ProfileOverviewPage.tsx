import { Page, PageContent, PageHeader } from 'grommet';
import PageProvider from '../../common/PageProvider';

const ProfileOverviewPage = () => {
  return (
    <PageProvider>
      <PageContent>
        <PageHeader
          title="Overview"
        />
      </PageContent>
    </PageProvider>
  )
}

export default ProfileOverviewPage;