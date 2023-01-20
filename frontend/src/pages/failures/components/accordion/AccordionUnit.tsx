import React, { useState } from 'react';
import {
  Box,
  NameValueList,
  NameValuePair,
  Tab,
  Tabs,
  AccordionPanel
} from 'grommet';
import AccordionTitle from './AccordionTitle';

const AccordionUnit = ({ failure }: any) => {
  const [index, setIndex] = useState();
  const onActive = (nextIndex: any) => setIndex(nextIndex);
  const pad = 'small';
  const { title, description, technologies, starRating, tags, votes, dateOfCreation } = failure;

  return (
    <AccordionPanel key={failure.id} label={<AccordionTitle title={title} tags={tags} />}>
      <Box pad={pad}>
        <Box gap="medium">
          <Tabs activeIndex={index} onActive={onActive} justify="center">
            <Tab title="Overview">
              <Box gap="small">
                <NameValueList
                  pairProps={{ direction: 'column' }}
                  layout="grid"
                  valueProps={{ width: 'small' }}
                  justifyContent="center">
                  <NameValuePair key={description} name="Description">
                    {description}
                  </NameValuePair>
                  <NameValuePair key="tech" name="Technologies">
                    {technologies}
                  </NameValuePair>
                  <NameValuePair key="star" name="Stars">
                    {starRating}
                  </NameValuePair>
                  <NameValuePair key={votes} name="Votes">
                    {votes}
                  </NameValuePair>
                  <NameValuePair key={dateOfCreation} name="Created">
                    {dateOfCreation}
                  </NameValuePair>
                </NameValueList>
              </Box>

            </Tab>
            <Tab title="Review">
              <Box margin="small">Review</Box>
            </Tab>
            <Tab title="Comments">
              <Box margin="small">Comments</Box>
            </Tab>
          </Tabs>
        </Box>
      </Box>
    </AccordionPanel>
  );
};

export default AccordionUnit;