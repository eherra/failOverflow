import PageProvider from '../common/PageProvider';
import TopContent from './components/TopContent';
import MiddleContent from './components/MiddleContent';
import BottomContent from './components/BottomContent';

const LandingPage = () => {
  return (
    <PageProvider>
      <TopContent />
      <MiddleContent />
      <BottomContent />
    </PageProvider>
  );
};

export default LandingPage;
