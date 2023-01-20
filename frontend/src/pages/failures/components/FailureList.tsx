import {
  Accordion,
} from 'grommet';
import { failureData } from '../../../mockData';
import AccordionUnit from './accordion/AccordionUnit';

const FailureList = () => {
  return (
    <Accordion multiple width="90%">
      {failureData.failures.map((failure, index) =>
        <AccordionUnit key={index} failure={failure} />
      )}
    </Accordion >
  );
};

export default FailureList;