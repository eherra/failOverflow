import {
  Accordion,
} from 'grommet';
import { useState, useEffect } from 'react';
import { failureData } from '../../../mockData';
import AccordionUnit from './accordion/AccordionUnit';

interface Creator {
  name: string,
  avatar: string
}

interface Failure {
  id: number,
  creator: Creator,
  title: string,
  description: string,
  technologies: Array<string>,
  starRating: string,
  tags: Array<string>,
  votes: number,
  timeOfCreation: string,
  comments: Array<string>
}

const FailureList = () => {
  const [failures, setFailures] = useState<Array<Failure>>([]);

  useEffect(() => {
    setFailures(() => failureData.failures)
  }, []);

  return (
    <Accordion multiple width="90%">
      {failures.map((failure, index) =>
        <AccordionUnit key={index} failure={failure} />
      )}
    </Accordion >
  );
};

export default FailureList;