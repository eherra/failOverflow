import PageProvider from '../common/PageProvider';
import { Link } from 'react-router-dom';
import { PageContent, PageHeader, Button, CardHeader, Text, Grid, Paragraph, Card, Heading, CardFooter, CardBody } from "grommet";
import VoteOfTheWeekCard from './components/VoteOfTheWeekCard';

const userName = "John Wilkes"

const HomePage = () => {
  const helloUser = `Hello, ${userName}`
  return (
    <PageProvider>
      <PageContent>
        <PageHeader
          title={helloUser}
          subtitle="Welcome to Failover Flow"
        />
        <Grid columns={{ count: 'fit', size: 'medium' }} gap="medium">
          <Card
            margin="medium"
            pad="medium"
          >
            <CardHeader align="start" direction="column" gap="xsmall">
              <Heading level={2} size="small">
                Feeling like failing?
              </Heading>
            </CardHeader>
            <CardBody>
              Start
            </CardBody>
            <CardFooter pad="small">
              <Link to=""><Button focusIndicator label="pressme" /></Link>
            </CardFooter>
          </Card>

          <VoteOfTheWeekCard />
        </Grid>

      </PageContent>
    </PageProvider>
  );
};

export default HomePage;