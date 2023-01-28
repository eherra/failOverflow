import {
  Box,
  Text,
} from 'grommet';

import { CircleInformation } from 'grommet-icons';

interface IUsernameTakenError {
  isUsernameTaken: boolean
}

const UsernameTakenError = ({ isUsernameTaken }: IUsernameTakenError) => {
  return (
    <>
      {isUsernameTaken && (
        <>
          <Box direction='row' gap='xsmall'>
            <CircleInformation size="medium" />
            <Text size="medium">
              <b>Username</b> is taken - provide another.
            </Text>
          </Box>
        </>
      )}

    </>
  )
}

export default UsernameTakenError;