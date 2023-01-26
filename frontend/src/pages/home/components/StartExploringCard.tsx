import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Button
} from 'grommet';

import {
  FormNext
} from 'grommet-icons';

const StartExploringCard = () => {
  return (
    <Card
      margin="medium"
      pad="medium"
    >
      <CardHeader align="start" direction="column" gap="xsmall">
        <Heading level={2} size="small">
          Feeling like failing today?
        </Heading>
      </CardHeader>
      <CardBody>
        Start
      </CardBody>
      <CardFooter pad="small">
        <Link to="/failures"><Button reverse icon={<FormNext />} hoverIndicator label="Start exploring failures" /></Link>
      </CardFooter>
    </Card>
  )
}

export default StartExploringCard;