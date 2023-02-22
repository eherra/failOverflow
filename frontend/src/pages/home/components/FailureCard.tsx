import { useState, ReactNode, useContext } from 'react';
import {
  Card,
  CardHeader,
  Heading,
  Box,
  Avatar,
  CardBody,
  NameValueList,
  NameValuePair,
  CardFooter,
  Button,
  ResponsiveContext,
  Text,
} from 'grommet';
import FailureDetailModal from '../../common/FailureDetailModal';
import { ICreator, IFailureOfTheMonth, IFailureOfTheWeek } from '../../../types';

interface IFailureCard {
  ownColumn: ReactNode;
  heading: ReactNode;
  failure?: IFailureOfTheWeek | IFailureOfTheMonth;
  creator?: ICreator;
}

const FailureCard = ({ ownColumn, failure, creator, heading }: IFailureCard) => {
  const screenSize = useContext(ResponsiveContext);
  const [failureDetailsModalShow, setFailureDetailsModalShow] = useState<boolean>(false);

  return (
    <>
      <Card margin='medium' pad='medium'>
        <CardHeader align='start' direction='column' gap='xxxsmall'>
          <Heading level={1} size='small'>
            {heading}
          </Heading>
          {failure && (
            <Box direction='row' gap='xsmall'>
              <Text>created by</Text>
              <Text style={{ textDecoration: 'underline' }}>{creator?.username}</Text>
              <Avatar
                src='https://failoverflow.s3.eu-north-1.amazonaws.com/ad8c073fb3e3ec67996748bad8499918'
                size='medium'
              />
            </Box>
          )}
        </CardHeader>
        {failure ? (
          <>
            <CardBody pad='medium'>
              <NameValueList
                pairProps={{ direction: 'column' }}
                layout='grid'
                valueProps={{ width: 'small' }}
                justifyContent='center'>
                <NameValuePair name='Title'>{failure?.title}</NameValuePair>
                {ownColumn}
              </NameValueList>
            </CardBody>
            <CardFooter
              align={['xsmall', 'small'].includes(screenSize) ? 'end' : undefined}
              gap='xsmall'>
              <Button
                style={{ marginLeft: 'auto' }}
                label='View details'
                onClick={() => {
                  setFailureDetailsModalShow(true);
                }}
              />
            </CardFooter>
          </>
        ) : (
          <p>There are no failures created.</p>
        )}
      </Card>
      {failureDetailsModalShow && (
        <FailureDetailModal failure={failure} setDetailsModalShow={setFailureDetailsModalShow} />
      )}
    </>
  );
};

export default FailureCard;
