import {
  Grid,
  Page,
  PageContent,
  PageHeader,
  Box,
  Image,
  Accordion,
  AccordionPanel,
} from 'grommet';

const QuestionAccordion = () => {
  return (
    <Accordion width='large' multiple>
      <AccordionPanel label='What is Fail Overflow?'>
        <Box pad='small'>Stackoverflow but for fails</Box>
      </AccordionPanel>
      <AccordionPanel label='Can I delete my failures later?'>
        <Box pad='small'>Navigate to profile {'>'} account details</Box>
      </AccordionPanel>
      <AccordionPanel label='How can I access others user data?'>
        <Box pad='small'>
          <Image src={'/FAQ/doge-with-it-cool.gif'} height='200px' width='200px' />
        </Box>
      </AccordionPanel>
      <AccordionPanel label='Where do I change password?'>
        <Box pad='small'>Nagivate to profile {'>'} account details</Box>
      </AccordionPanel>
    </Accordion>
  );
};

export default QuestionAccordion;
