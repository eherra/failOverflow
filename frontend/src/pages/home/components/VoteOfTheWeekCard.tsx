import {
  Card,
  CardHeader,
  Heading,
  Text,
  CardBody,
  Paragraph
} from 'grommet';

const VoteOfTheWeekCard = () => {
  return (
    <Card
      margin="medium"
      pad="medium"
    >
      <CardHeader align="start" direction="column" gap="xsmall">
        <Heading level={2} size="small">
          Failure of the Week (votes: 12)
        </Heading>
        <Text>
          User info here
        </Text>
      </CardHeader>
      <CardBody>
        <Paragraph>
          Show more button...

          Description of the failure of the week here
        </Paragraph>

        <Paragraph>
          Solution of the failure of the week here
        </Paragraph>
      </CardBody>

    </Card>
  )
}

export default VoteOfTheWeekCard;