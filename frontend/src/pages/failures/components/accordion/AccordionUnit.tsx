import { useState } from 'react';
import { Box, Tabs, AccordionPanel } from 'grommet';
import { IFailure } from '../../../../types';
import ReviewTab from './tabs/reviewTab/ReviewTab';
import AccordionTitle from './AccordionTitle';
import OverviewTab from './tabs/OverviewTab';
import CommentTab from './tabs/commentTab/CommentTab';

const AccordionUnit = ({ failure }: { failure: IFailure }) => {
  const [tabIndex, setTabIndex] = useState<number>();
  const onActive = (nextIndex: number) => setTabIndex(nextIndex);
  const { _id, title, creator, description, solution, technologies, createdAt, allowComments } =
    failure;

  return (
    <AccordionPanel
      key={_id}
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
            <ReviewTab failureId={_id} />
          </>
          <>
            <CommentTab allowComments={allowComments} failureId={_id} />
          </>
        </Tabs>
      </Box>
    </AccordionPanel>
  );
};

export default AccordionUnit;
