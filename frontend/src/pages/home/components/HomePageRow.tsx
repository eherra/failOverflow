import { Box, Image, Grid } from 'grommet';
import { ReactNode } from 'react';

interface HomePageRowProps {
  picFirst?: boolean;
  svgPath: string;
  content: ReactNode;
}

const HomePageRow = ({ picFirst, svgPath, content }: HomePageRowProps) => {
  const ImageColumn = () => {
    return (
      <Box height='medium'>
        <Image src={svgPath} fit='contain' />
      </Box>
    );
  };

  return (
    <Grid columns={{ count: 'fit', size: 'medium' }} gap='medium'>
      {picFirst ? (
        <>
          <ImageColumn />
          {content}
        </>
      ) : (
        <>
          {content}
          <ImageColumn />
        </>
      )}
    </Grid>
  );
};

export default HomePageRow;
