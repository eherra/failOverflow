import { useState } from 'react';
import { Box, Tabs, AccordionPanel } from 'grommet';
import ReviewTab from './tabs/reviewTab/ReviewTab';
import AccordionTitle from './AccordionTitle';
import OverviewTab from './tabs/OverviewTab';
import CommentTab from './tabs/CommentTab';
import { Failure } from '../../../../types';
import { useUserContext } from '../../../../context/UserContext';

interface IAccordionUnitProps {
  failure: Failure;
}

const AccordionUnit = ({ failure }: IAccordionUnitProps) => {
  const [index, setIndex] = useState();
  const { user } = useUserContext();

  const onActive = (nextIndex: any) => setIndex(nextIndex);
  const { title, creator, description, solution, technologies, tags, timeOfCreation } = failure;

  return (
    <AccordionPanel
      key={failure.id}
      label={
        <AccordionTitle
          creator={creator}
          title={title}
          tags={tags}
          timeOfCreation={timeOfCreation}
        />
      }>
      <Box gap='small' pad='small' background='light-5'>
        <Tabs activeIndex={index} onActive={onActive} justify='center'>
          <>
            <OverviewTab
              description={description}
              solution={solution}
              technologies={technologies}
              timeOfCreation={timeOfCreation}
            />
          </>
          <>
            <ReviewTab isAuth={!!user} failureId={failure.id} />
          </>
          <>
            <CommentTab isAuth={!!user} comments={failure.comments} failureId={failure.id} />
          </>
        </Tabs>
      </Box>
    </AccordionPanel>
  );
};

export default AccordionUnit;
