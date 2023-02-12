import { useState, useEffect, useContext } from 'react';
import { weekVoteData } from '../../../mockData';
import { Rating } from 'react-simple-star-rating';

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
import { Favorite } from 'grommet-icons';
import FailureDetailModal from '../../common/FailureDetailModal';
import { Failure } from '../../../types';

const MostLikedFailureCard = () => {
  const screenSize = useContext(ResponsiveContext);
  const [failureDetailsModalShow, setFailureDetailsModalShow] = useState<boolean>(false);
  const [monthReview, setMonthReview] = useState<Failure | undefined>(undefined);

  useEffect(() => {
    //setMonthReview(() => weekVoteData.weekVote);
  }, []);

  const reviewAverageAsFloat = parseFloat(monthReview?.starRating || '0');

  return (
    <>
      <Card margin='medium' pad='medium'>
        <CardHeader align='start' direction='column' gap='xsmall'>
          <Heading level={1} size='small'>
            <Box gap='small' direction='row'>
              <Favorite />
              Months most liked Failure
            </Box>
          </Heading>
          <Box direction='row' gap='small' pad='xsmall'>
            by
            <Avatar src='avatar.png' size='medium' />
            <p>{monthReview?.creator[0].username}</p>
          </Box>
        </CardHeader>
        <CardBody>
          <NameValueList
            pairProps={{ direction: 'column' }}
            layout='grid'
            valueProps={{ width: 'small' }}
            justifyContent='start'>
            <NameValuePair name='Title'>{monthReview?.title}</NameValuePair>
            <NameValuePair name={`Review average (${reviewAverageAsFloat})`}>
              <Rating readonly initialValue={reviewAverageAsFloat} allowFraction></Rating>
            </NameValuePair>
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
          failure={monthReview}
          setDetailsModalShow={setFailureDetailsModalShow}
        />
      )}
    </>
  );
};

export default MostLikedFailureCard;
