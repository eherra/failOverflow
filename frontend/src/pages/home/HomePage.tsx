import PageProvider from '../common/PageProvider';
import { PageContent, PageHeader } from 'grommet';
import VoteOfTheWeekCard from './components/VoteOfTheWeekCard';
import MostLikedFailureCard from './components/MostLikedFailureCard';
import StartExploringCard from './components/StartExploringCard';
import HomePageRow from './components/HomePageRow';
import useAuth from '../../hooks/useAuth';

const HomePage = () => {
  const { user } = useAuth();
  const helloUserText = `Hello ${user?.username},`;

  return (
    <PageProvider>
      <PageContent>
        <PageHeader title={helloUserText} subtitle='Welcome to Failover Flow' />
        <HomePageRow picFirst svgPath='/homepage/explore.svg' content={<StartExploringCard />} />
        <HomePageRow svgPath='/homepage/vote.svg' content={<VoteOfTheWeekCard />} />
        <HomePageRow picFirst svgPath='/homepage/review.svg' content={<MostLikedFailureCard />} />
      </PageContent>
    </PageProvider>
  );
};

export default HomePage;
