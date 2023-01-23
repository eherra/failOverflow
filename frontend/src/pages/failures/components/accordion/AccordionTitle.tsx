import { Tag, Box, Avatar } from "grommet"

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

const createTimePassedInfo = (date: string) => {
  const differenceInMills = Math.trunc(new Date().getTime() - new Date(date).getTime());

  const minutes = Math.trunc(differenceInMills / (1000 * 60));
  const hours = Math.trunc(differenceInMills / (1000 * 60 * 60));
  const days = Math.trunc(differenceInMills / (1000 * 60 * 60 * 24));
  const months = Math.trunc(days / 31);
  const years = Math.trunc(months / 12);

  if (!years && !months && !days && !hours) return `${minutes}min`;
  if (!years && !months && !days) return `${hours}h`;
  if (!years && !months) return `${days}d`;
  if (!years) return `${months}m`;
  return `${years}y`;
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