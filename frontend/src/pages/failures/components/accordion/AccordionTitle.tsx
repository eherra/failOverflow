import { Tag, Box, Avatar } from 'grommet';
import { createTimePassedInfo } from '../../../../utils/TimeUtils';
import { ICreator } from '../../../../types';

interface IAccordionTitle {
  creator: ICreator;
  title: string;
  technologies: Array<string>;
  createdAt: string;
}

const AccordionTitle = ({ creator, title, technologies, createdAt }: IAccordionTitle) => {
  return (
    <Box direction='column'>
      <Box direction='row' gap='small' pad='xsmall'>
        <Avatar src={creator.avatarUrl ? creator.avatarUrl : 'avatar.png'} size='medium' />
        <p>{creator.username}</p>
        <p style={{ opacity: '0.8' }}>{`created ${createTimePassedInfo(createdAt)} ago`}</p>
      </Box>
      <Box direction='row' gap='small'>
        <p style={{ fontSize: '25px' }}>{title}</p>
        {technologies?.map((mapTech, index) => (
          <Tag key={index} alignSelf='center' size='small' value={mapTech} />
        ))}
      </Box>
    </Box>
  );
};

export default AccordionTitle;
