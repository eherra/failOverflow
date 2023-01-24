import PageProvider from '../common/PageProvider';
import { PageContent, PageHeader } from "grommet";

const HomePage = () => {
  return (
    <PageProvider>
      <PageContent>
      <PageHeader
          title="Hello home"
        />
      </PageContent>
    </PageProvider>
  );
};

export default HomePage;