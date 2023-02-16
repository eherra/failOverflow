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
} from 'grommet';
import FailureDetailModal from '../../common/FailureDetailModal';
import { Creator, IFailureOfTheMonth, IFailureOfTheWeek } from '../../../types';

interface IFailureCard {
  ownColumn: ReactNode;
  heading: ReactNode;
  failure?: IFailureOfTheWeek | IFailureOfTheMonth;
  creator?: Creator;
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
            <Box direction='row' gap='xsmall' pad='xxsmall'>
              <p>created by</p>
              <p>{creator?.username}</p>
              <Avatar src='avatar.png' size='medium' />
            </Box>
          )}
        </CardHeader>
        {failure ? (
          <>
            <CardBody>
              <NameValueList
                pairProps={{ direction: 'column' }}
                layout='grid'
                valueProps={{ width: 'small' }}
                justifyContent='start'>
                <NameValuePair name='Title'>{failure?.title}</NameValuePair>
                {ownColumn}
              </NameValueList>
            </CardBody>
            <CardFooter
              align={['xsmall', 'small'].includes(screenSize) ? 'end' : 'end'}
              gap='xsmall'>
              <Button
                label='Show details'
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
