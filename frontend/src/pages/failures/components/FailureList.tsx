import {
  Accordion,
} from 'grommet';
import { failureData } from '../../../mockData';
import AccordionUnit from './accordion/AccordionUnit';

const FailureList = ({ ...rest }) => {
  return (
    <Accordion multiple width="80%" {...rest}>
      {failureData.failures.map((failure, index) =>
        <AccordionUnit key={index} failure={failure} />
      )}
    </Accordion >
  );
};

export default FailureList;