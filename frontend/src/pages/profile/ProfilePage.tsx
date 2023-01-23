import PageProvider from '../common/PageProvider';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Heading,
  Grid,
  Page,
  PageContent,
  PageHeader,
  Text,
  CardFooter,
} from 'grommet';
import {
  UserSettings,
  Scorecard
} from 'grommet-icons';

const ProfilePage = () => {
  return (
    <PageProvider>
      <Page>
        <PageContent>
          <PageHeader
            title="Manage Profile"
          />
          <Grid columns={{ count: 'fit', size: 'medium' }} gap="medium">
            <Card
              margin="medium"
              pad="medium"
            >
              <CardHeader align="start" direction="column" gap="xsmall">
                <UserSettings />
                <Heading level={2} size="small">
                  Account details
                </Heading>
                <Text size="small">View and make changes to your account details</Text>
              </CardHeader>
              <CardFooter>
                <Button focusIndicator label="Edit profile" />
              </CardFooter>
            </Card>

            <Card
              margin="medium"
              pad="medium"
              hoverIndicator
            >
              <CardHeader align="start" direction="column" gap="xsmall">
                <Scorecard />
                <Heading level={2} size="small">
                  Overview
                </Heading>
                <Text size="small">
                  View overview of your posts, stars and votes
                </Text>
              </CardHeader>
              <CardFooter>
                <Button focusIndicator label="Check overview" />
              </CardFooter>
            </Card>
          </Grid>
        </PageContent>
      </Page>
    </PageProvider>
  );
};

export default ProfilePage;