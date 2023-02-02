import { useState, useContext } from 'react';
import { Box, Tabs, AccordionPanel } from 'grommet';
import ReviewTab from './tabs/ReviewTab';
import AccordionTitle from './AccordionTitle';
import OverviewTab from './tabs/OverviewTab';
import CommentTab from './tabs/CommentTab';
import { Failure } from '../../../../types';
import { UserContext } from '../../../../context/UserContext';

interface IAccordionUnitProps {
  failure: Failure;
}

const AccordionUnit = ({ failure }: IAccordionUnitProps) => {
  const [index, setIndex] = useState();
  const { user } = useContext(UserContext);

  const onActive = (nextIndex: any) => setIndex(nextIndex);
  const {
    title,
    creator,
    description,
    solution,
    technologies,
    starRating,
    tags,
    votes,
    timeOfCreation,
  } = failure;

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
            <ReviewTab isAuth={user.auth} stars={starRating} votes={votes} />
          </>
          <>
            <CommentTab isAuth={user.auth} comments={failure.comments} />
          </>
        </Tabs>
      </Box>
    </AccordionPanel>
  );
};

export default AccordionUnit;
