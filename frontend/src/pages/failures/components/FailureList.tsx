import {
  Accordion,
} from 'grommet';
import { useState, useEffect } from 'react';
import { failureData } from '../../../mockData';
import AccordionUnit from './accordion/AccordionUnit';
import { Failure } from '../../../types';

const FailureList = () => {
  const [failures, setFailures] = useState<Array<Failure>>([]);

  useEffect(() => {
    setFailures(() => failureData.failures)
  }, []);

  return (
    <Accordion multiple width="85%">
      {failures.map((failure, index) =>
        <AccordionUnit key={index} failure={failure} />
      )}
    </Accordion >
  );
};

export default FailureList;