import { Button } from 'grommet';
import { FormDown, FormUp } from 'grommet-icons';

interface IShowMoreCommentsButton {
  commentsAmount: number;
  showAll: boolean;
  setShowAll(boolean: any): void;
}

const ShowMoreCommentsButton = ({
  commentsAmount,
  showAll,
  setShowAll,
}: IShowMoreCommentsButton) => (
  <Button
    plain
    style={{ textDecoration: 'underline' }}
    alignSelf='start'
    size='small'
    label={showAll ? 'Show less' : `Show more comments (${commentsAmount - 2})`}
    onClick={() => setShowAll(() => !showAll)}
    icon={!showAll ? <FormDown /> : <FormUp />}
    reverse
  />
);

export default ShowMoreCommentsButton;
