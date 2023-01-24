import {
  Button,
  Card,
  CardHeader,
  Heading,
  Text,
  CardFooter,
} from 'grommet';
import { ReactNode } from 'react';

interface ProfilePageCardProps {
  title: string,
  subtitle: string,
  buttonLabel: string,
  icon: ReactNode
}

const ProfilePageCard = ({ title, subtitle, buttonLabel, icon }: ProfilePageCardProps) => {
  return (
    <Card
      margin="medium"
      pad="medium"
    >
      <CardHeader align="start" direction="column" gap="xsmall">
        {icon}
        <Heading level={2} size="small">
          {title}
        </Heading>
        <Text size="small">{subtitle}</Text>
      </CardHeader>
      <CardFooter>
        <Button focusIndicator label={buttonLabel} />
      </CardFooter>
    </Card>
  )
}

export default ProfilePageCard;