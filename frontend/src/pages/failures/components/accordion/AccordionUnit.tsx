import { useState } from 'react';
import { Box, Tabs, AccordionPanel } from 'grommet';
import ReviewTab from './tabs/reviewTab/ReviewTab';
import AccordionTitle from './AccordionTitle';
import OverviewTab from './tabs/OverviewTab';
import CommentTab from './tabs/commentTab/CommentTab';
import { Failure } from '../../../../types';

interface IAccordionUnitProps {
  failure: Failure;
}

const AccordionUnit = ({ failure }: IAccordionUnitProps) => {
  const [tabIndex, setTabIndex] = useState<number>();

  const onActive = (nextIndex: any) => setTabIndex(nextIndex);
  const { title, creator, description, solution, technologies, createdAt, allowComments } = failure;

  return (
    <AccordionPanel
      key={failure._id}
      label={
        <AccordionTitle
          creator={creator[0]}
          title={title}
          technologies={technologies}
          createdAt={createdAt}
        />
      }>
      <Box gap='small' pad='small' background='light-5'>
        <Tabs activeIndex={tabIndex} onActive={onActive} justify='center'>
          <>
            <OverviewTab
              description={description}
              solution={solution}
              technologies={technologies}
              createdAt={createdAt}
            />
          </>
          <>
            <ReviewTab failureId={failure._id} />
          </>
          <>
            <CommentTab allowComments={allowComments} failureId={failure._id} />
          </>
        </Tabs>
      </Box>
    </AccordionPanel>
  );
};

export default AccordionUnit;
