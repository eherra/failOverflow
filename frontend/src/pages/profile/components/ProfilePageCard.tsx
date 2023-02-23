import { Button, Card, CardHeader, Heading, Text, CardFooter } from 'grommet';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IProfilePageCard {
  title: string;
  subtitle: string;
  buttonLabel: string;
  link: string;
  icon: ReactNode;
  buttonIcon: JSX.Element;
}

const ProfilePageCard = ({
  title,
  subtitle,
  buttonLabel,
  link,
  icon,
  buttonIcon,
}: IProfilePageCard) => {
  return (
    <Card margin='medium' pad='medium'>
      <CardHeader pad='small' align='start' direction='column' gap='xsmall'>
        {icon}
        <Heading level={1} size='small'>
          {title}
        </Heading>
        <Text size='medium'>{subtitle}</Text>
      </CardHeader>
      <CardFooter margin={{ top: 'small' }}>
        <Link to={link}>
          <Button icon={buttonIcon} focusIndicator label={buttonLabel} />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProfilePageCard;
