import { Tag, Box } from "grommet"

interface TitleProps {
  title: string,
  tags: Array<string>
}

const AccordionTitle = ({ title, tags }: TitleProps) => {
  return (
    <Box direction="row" pad="medium" gap="small">
      <p style={{fontSize: '25px'}}>{title}</p>
      {tags?.map((mapTag, index) =>
        <Tag key={index} alignSelf="center" size="small" value={mapTag} />
      )}
    </Box>
  )
}


export default AccordionTitle;