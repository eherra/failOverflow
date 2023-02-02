import PageProvider from '../common/PageProvider';
import HeaderBackLink from '../common/HeaderBackLink';
import { Grid, Page, PageContent, PageHeader, Box, Image } from 'grommet';

import QuestionAccordion from './components/QuestionAccordion';

const FaQPage = () => {
  const isLogged = true;
  return (
    <PageProvider>
      <Page>
        <PageContent>
          <PageHeader
            title='Frequently asked questions'
            parent={<HeaderBackLink label='Return' link={isLogged ? '/' : '/landing'} />}
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

export default FaQPage;
