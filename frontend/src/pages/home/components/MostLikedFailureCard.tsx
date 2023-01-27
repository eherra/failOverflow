import React, { useState, useEffect } from 'react';
import { dayReviewData } from '../../../mockData';

import {
  Card,
  CardHeader,
  Heading,
  Box,
  Avatar,
  CardBody,
  NameValueList,
  NameValuePair,
  StarRating
} from 'grommet';

interface Creator {
  name: string,
  avatar: string
}

interface ReviewInfo {
  creator: Creator,
  title: string,
  starRating: string,
}

const MostLikedFailureCard = () => {
  const [dayReview, setDayReview] = useState<ReviewInfo | undefined>(undefined);

  useEffect(() => {
    setDayReview(() => dayReviewData.dayReview)
  }, []);

  return (
    <Card
      margin="medium"
      pad="medium"
    >
      <CardHeader align="start" direction="column" gap="xsmall">
        <Heading level={2} size="small">
          Months most liked Failure
        </Heading>
        <Box direction="row" gap="small" pad="xsmall">
          by 
          <Avatar src="avatar.png" size="medium" />
          <p>{dayReview?.creator.name}</p>
        </Box>
      </CardHeader>
      <CardBody>
        <NameValueList
          pairProps={{ direction: 'column' }}
          layout="grid"
          valueProps={{ width: 'small' }}
          justifyContent="start">
          <NameValuePair name="Title">
            {dayReview?.title}
          </NameValuePair>
          <NameValuePair name="Stars">
            <StarRating name="keke" />
          </NameValuePair>
        </NameValueList>
      </CardBody>
    </Card>
  )
};

export default MostLikedFailureCard;