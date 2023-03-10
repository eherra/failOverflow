import { useContext } from 'react';
import {
  Box,
  Button,
  Heading,
  Layer,
  NameValueList,
  NameValuePair,
  ResponsiveContext,
} from 'grommet';
import { Catalog } from 'grommet-icons';
import { IFailure } from '../../types';
import { createStyledDateInfo } from '../utils/timeUtils';
import { IFailureOfTheMonth } from '../../types';
import { IFailureOfTheWeek } from '../../types';
import TruncateText from './TruncateText';

interface IShowFailureDetailsModal {
  failure?: IFailure | IFailureOfTheWeek | IFailureOfTheMonth;
  setDetailsModalShow(boolean: any): void;
}

const FailureDetailModal = ({ setDetailsModalShow, failure }: IShowFailureDetailsModal) => {
  const screenSize = useContext(ResponsiveContext);

  return (
    <Layer
      onClickOutside={() => setDetailsModalShow(false)}
      onEsc={() => setDetailsModalShow(false)}
      modal={true}
      style={{ overflow: 'auto' }}>
      <Box pad='medium' direction='row' gap='medium'>
        <Box direction='row' align='start' gap='small'>
          <Catalog />
          <Heading level={2} size='small' margin='none'>
            Failure details
          </Heading>
        </Box>
      </Box>
      <Box gap='small' margin='medium' direction='row'>
        <NameValueList
          pairProps={{ direction: 'column' }}
          layout='grid'
          valueProps={{ width: 'large' }}
          justifyContent='center'>
          <NameValuePair key={failure?.title} name='Title'>
            {failure?.title}
          </NameValuePair>
          <NameValuePair key={failure?.description} name='Description'>
            <TruncateText text={failure?.description || ''} />
          </NameValuePair>
          <NameValuePair key={failure?.solution} name='Solution'>
            <TruncateText text={failure?.solution || ''} />
          </NameValuePair>
          <NameValuePair key='tech' name='Technologies'>
            {failure?.technologies.join(', ')}
          </NameValuePair>
          <NameValuePair key={failure?.createdAt} name='Created'>
            {createStyledDateInfo(failure?.createdAt || '')}
          </NameValuePair>
        </NameValueList>
      </Box>
      <Box
        align={['xsmall', 'small'].includes(screenSize) ? undefined : 'end'}
        pad='small'
        gap='xsmall'>
        <Button
          label='Close details'
          onClick={() => {
            setDetailsModalShow(false);
          }}
        />
      </Box>
    </Layer>
  );
};

export default FailureDetailModal;
