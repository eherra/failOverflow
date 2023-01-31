import { Button } from 'grommet';
import { FormDown, FormUp } from 'grommet-icons';

interface IShowMoreCommentsButton {
  showAll: boolean;
  setShowAll(boolean: any): void;
}

const ShowMoreCommentsButton = ({ showAll, setShowAll }: IShowMoreCommentsButton) => (
  <Button
    alignSelf='start'
    size='small'
    label={`Show ${!showAll ? 'all' : 'less'} comments`}
    onClick={() => setShowAll(() => !showAll)}
    icon={!showAll ? <FormDown /> : <FormUp />}
    reverse
  />
);

export default ShowMoreCommentsButton;
