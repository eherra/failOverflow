import { Button, Card, CardHeader, Heading, Text, CardFooter } from 'grommet';
import { ReactNode } from 'react';
import { WavyLink } from 'react-wavy-transitions';

interface ProfilePageCardProps {
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
}: ProfilePageCardProps) => {
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
        <WavyLink to={link} color='#A7BEAE' duration='800' direction='up'>
          <Button icon={buttonIcon} focusIndicator label={buttonLabel} />
        </WavyLink>
      </CardFooter>
    </Card>
  );
};

export default ProfilePageCard;
