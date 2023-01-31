import { Button, Card, CardHeader, Heading, Text, CardFooter } from 'grommet';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ProfilePageCardProps {
  title: string;
  subtitle: string;
  buttonLabel: string;
  link: string;
  icon: ReactNode;
}

const ProfilePageCard = ({ title, subtitle, buttonLabel, link, icon }: ProfilePageCardProps) => {
  return (
    <Card margin='medium' pad='medium'>
      <CardHeader pad='small' align='start' direction='column' gap='xsmall'>
        {icon}
        <Heading level={2} size='small'>
          {title}
        </Heading>
        <Text size='small'>{subtitle}</Text>
      </CardHeader>
      <CardFooter>
        <Link to={link}>
          <Button focusIndicator label={buttonLabel} />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProfilePageCard;
