import PageProvider from '../common/PageProvider';
import { PageContent, PageHeader } from 'grommet';
import FailureOfTheWeekCard from './components/FailureOfTheWeekCard';
import FailureOfTheMonth from './components/FailureOfTheMonthCard';
import StartExploringCard from './components/StartExploringCard';
import HomePageRow from './components/HomePageRow';
import { useUserContext } from '../../context/UserContext';

const HomePage = () => {
  const { user } = useUserContext();
  const helloUserText = `Hello ${user?.username},`;

  return (
    <PageProvider>
      <PageContent>
        <PageHeader title={helloUserText} subtitle='Welcome to Failover Flow' />
        <HomePageRow picFirst svgPath='/homepage/explore.svg' content={<StartExploringCard />} />
        <HomePageRow svgPath='/homepage/vote.svg' content={<FailureOfTheWeekCard />} />
        <HomePageRow picFirst svgPath='/homepage/review.svg' content={<FailureOfTheMonth />} />
      </PageContent>
    </PageProvider>
  );
};

export default HomePage;
