import { Box, Heading, Paragraph, Button, PageContent } from 'grommet';

const BottomContent = () => {
  return (
    <PageContent>
      <Box
        alignSelf="center"
        height={{ min: 'large' }}
        pad={{ vertical: 'xlarge' }}
      >
        <Heading level={2} size="large">
          Start contributing and make others fail faster.
        </Heading>
        <Paragraph size="xlarge">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel elit facilisis, lacinia eros vel, euismod magna.
        </Paragraph>
        <Box direction="row" gap="small" pad="small">
          <Button alignSelf="start" color="#A7BEAE" primary label="Share the bugs" size="large" />
          <Button type="submit" color="#A7BEAE" size="large" label="Sign in" />
        </Box>
      </Box>
    </PageContent>
  )
};

export default BottomContent;