import { useContext } from 'react';
import PageProvider from '../common/PageProvider';
import HeaderBackLink from '../common/HeaderBackLink';
import { Grid, Page, PageContent, PageHeader, Box, Image } from 'grommet';
import { UserContext } from '../../context/UserContext';

import QuestionAccordion from './components/QuestionAccordion';

const FAQPage = () => {
  const { user } = useContext(UserContext);

  return (
    <PageProvider>
      <Page>
        <PageContent>
          <PageHeader
            title='Frequently asked questions'
            parent={<HeaderBackLink label='Return' link={user.auth ? '/' : '/landing'} />}
          />
          <Grid columns={{ count: 'fit', size: 'medium' }} gap='medium'>
            <QuestionAccordion />
            <Box height='medium'>
              <Image src={'/FAQ/faq.svg'} fit='contain' />
            </Box>
          </Grid>
        </PageContent>
      </Page>
    </PageProvider>
  );
};

export default FAQPage;
