import React, { useState } from 'react';
import { Box, Tabs, AccordionPanel } from 'grommet';
import ReviewTab from './tabs/ReviewTab';
import AccordionTitle from './AccordionTitle';
import OverviewTab from './tabs/OverviewTab';
import CommentTab from './tabs/CommentTab';

interface Creator {
  name: string;
  avatar: string;
}

interface Failure {
  id: number;
  creator: Creator;
  title: string;
  description: string;
  solution: string;
  technologies: Array<string>;
  starRating: string;
  tags: Array<string>;
  votes: number;
  timeOfCreation: string;
  comments: Array<string>;
}

interface IAccordionUnitProps {
  failure: Failure;
}

const AccordionUnit = ({ failure }: IAccordionUnitProps) => {
  const [index, setIndex] = useState();

  const onActive = (nextIndex: any) => setIndex(nextIndex);
  const { title, creator, description, solution, technologies, starRating, tags, votes, timeOfCreation } = failure;

  return (
    <AccordionPanel
      key={failure.id}
      label={<AccordionTitle creator={creator} title={title} tags={tags} timeOfCreation={timeOfCreation} />}>
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
            <ReviewTab stars={starRating} votes={votes} />
          </>
          <>
            <CommentTab comments={failure.comments} />
          </>
        </Tabs>
      </Box>
    </AccordionPanel>
  );
};

export default AccordionUnit;
