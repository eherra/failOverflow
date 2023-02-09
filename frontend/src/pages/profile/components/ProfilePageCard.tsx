import { Button, Card, CardHeader, Heading, Text, CardFooter } from 'grommet';
import { ReactNode } from 'react';
import { WavyLink } from 'react-wavy-transitions';

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
        <WavyLink to={link} color='#A7BEAE' duration='800' direction='up'>
          <Button focusIndicator label={buttonLabel} />
        </WavyLink>
      </CardFooter>
    </Card>
  );
};

export default ProfilePageCard;
