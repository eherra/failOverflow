import { useState, useEffect, useContext } from 'react';
import FailureDetailModal from '../../common/FailureDetailModal';
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
import { Calendar } from 'grommet-icons';
import failureService from '../../../api/failures';
import { Creator } from '../../../types';

interface IFailureOfTheWeek {
  _id: string;
  creator: Array<Creator>;
  title: string;
  description: string;
  solution: string;
  technologies: Array<string>;
  totalVotes: number;
  createdAt: string;
}

const VoteOfTheWeekCard = () => {
  const screenSize = useContext(ResponsiveContext);
  const [weekFailure, setWeekFailure] = useState<IFailureOfTheWeek | undefined>(undefined);
  const [failureDetailsModalShow, setFailureDetailsModalShow] = useState<boolean>(false);

  useEffect(() => {
    fetchFailureOfTheWeek();
  }, []);

  const fetchFailureOfTheWeek = async () => {
    try {
      const { failureOfTheWeek } = await failureService.getFailureOfTheWeek();
      console.log(failureOfTheWeek[0]);
      setWeekFailure(failureOfTheWeek[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const creator = weekFailure?.creator[0];

  return (
    <>
      <Card margin='medium' pad='medium'>
        <CardHeader align='start' direction='column' gap='xsmall'>
          <Heading level={1} size='small'>
            <Box gap='small' direction='row'>
              <Calendar />
              Failure of the Week
            </Box>
          </Heading>

          <Box direction='row' gap='small' pad='xsmall'>
            by
            <Avatar src='avatar.png' size='medium' />
            <p>{creator?.username}</p>
          </Box>
        </CardHeader>
        <CardBody>
          <NameValueList
            pairProps={{ direction: 'column' }}
            layout='grid'
            valueProps={{ width: 'small' }}
            justifyContent='start'>
            <NameValuePair name='Title'>{weekFailure?.title}</NameValuePair>
            <NameValuePair name='Votes acquired'>{weekFailure?.totalVotes}</NameValuePair>
          </NameValueList>
        </CardBody>
        <CardFooter align={['xsmall', 'small'].includes(screenSize) ? 'end' : 'end'} gap='xsmall'>
          <Button
            label='Show details'
            onClick={() => {
              setFailureDetailsModalShow(true);
            }}
          />
        </CardFooter>
      </Card>
      {failureDetailsModalShow && (
        <FailureDetailModal
          failure={weekFailure}
          setDetailsModalShow={setFailureDetailsModalShow}
        />
      )}
    </>
  );
};

export default VoteOfTheWeekCard;
