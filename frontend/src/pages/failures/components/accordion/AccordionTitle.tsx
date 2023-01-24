import { Tag, Box, Avatar } from "grommet"
import { createTimePassedInfo } from "../../../../TimeUtils"

interface Creator {
  name: string,
  avatar: string
}

interface TitleProps {
  creator: Creator,
  title: string,
  tags: Array<string>,
  timeOfCreation: string
}

const AccordionTitle = ({ creator, title, tags, timeOfCreation }: TitleProps) => {
  return (
    <Box direction="column" >
      <Box direction="row" gap="small" pad="xsmall">
        <Avatar src="avatar.png" size="medium" />
        <p>{creator.name}</p>
        <p style={{ opacity: '0.8' }}>{`created ${createTimePassedInfo(timeOfCreation)} ago`}</p>
      </Box>
      <Box direction="row" gap="small">
        <p style={{ fontSize: '25px' }}>{title}</p>
        {tags?.map((mapTag, index) =>
          <Tag key={index} alignSelf="center" size="small" value={mapTag} />
        )}
      </Box>
    </Box>
  )
}


export default AccordionTitle;