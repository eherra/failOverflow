import React, { useState } from 'react';
import {
  Box,
  Tabs,
  AccordionPanel
} from 'grommet';
import ReviewTab from './tabs/ReviewTab';
import AccordionTitle from './AccordionTitle';
import OverviewTab from './tabs/OverviewTab';
import CommentTab from './tabs/CommentTab';

interface Failure {
  id: number,
  title: string,
  description: string,
  technologies: Array<string>,
  starRating: string,
  tags: Array<string>,
  votes: number,
  dateOfCreation: string,
  comments: Array<string>
}

interface IAccordionUnitProps {
  failure: Failure
}

const AccordionUnit = ({ failure }: IAccordionUnitProps) => {
  const [index, setIndex] = useState();

  const onActive = (nextIndex: any) => setIndex(nextIndex);
  const { title, description, technologies, starRating, tags, votes, dateOfCreation } = failure;

  return (
    <AccordionPanel key={failure.id} label={<AccordionTitle title={title} tags={tags} />}>
      <Box gap="small" pad="small" background="light-5">
        <Tabs activeIndex={index} onActive={onActive} justify="center">
          <OverviewTab
            description={description}
            technologies={technologies}
            starRating={starRating}
            votes={votes}
            dateOfCreation={dateOfCreation}
          />
          <ReviewTab />
          <CommentTab comments={failure.comments} />
        </Tabs>
      </Box>
    </AccordionPanel>
  );
};

export default AccordionUnit;