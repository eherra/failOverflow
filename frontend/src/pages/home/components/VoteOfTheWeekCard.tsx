import React, { useState, useEffect } from 'react';
import { weekVoteData } from '../../../mockData';

import {
  Card,
  CardHeader,
  Heading,
  Box,
  Avatar,
  CardBody,
  Text,
  NameValueList,
  NameValuePair
} from 'grommet';

interface Creator {
  name: string,
  avatar: string
}

interface WeekVote {
  creator: Creator,
  title: string,
  description: string,
  solution: string,
  votes: number,
}

const VoteOfTheWeekCard = () => {
  const [weekVote, setWeekVote] = useState<WeekVote | undefined>(undefined);

  useEffect(() => {
    setWeekVote(() => weekVoteData.weekVote)
  }, []);

  return (
    <Card
      margin="medium"
      pad="medium"
    >
      <CardHeader align="start" direction="column" gap="xsmall">
        <Heading level={2} size="small">
          Failure of the Week (votes: {weekVote?.votes})
        </Heading>
        <Box direction="row" gap="small" pad="xsmall">
          {weekVote?.title}
          <Avatar src="avatar.png" size="medium" />
          <p>{weekVote?.creator.name}</p>
        </Box>
      </CardHeader>
      <CardBody>

        <NameValueList
          pairProps={{ direction: 'column' }}
          layout="grid"
          valueProps={{ width: 'small' }}
          justifyContent="start">
          <NameValuePair key={weekVote?.description} name="Description">
            {weekVote?.description}
          </NameValuePair>
          <NameValuePair key={weekVote?.solution} name="Solution">
            {weekVote?.solution}
          </NameValuePair>
        </NameValueList>
      </CardBody>
    </Card>
  )
};

export default VoteOfTheWeekCard;