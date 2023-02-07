import { useState } from 'react';
import {
  Box,
  Button,
  NameValueList,
  NameValuePair,
  Heading,
  Text,
  Card,
  CardBody,
  CardHeader,
  Avatar,
} from 'grommet';
import PasswordChangeForm from './PasswordChangeForm';
import AvatarChangeForm from './AvatarChangeForm';
import { useUserContext } from '../../../../../context/UserContext';

const ProfileDetailCard = () => {
  const { user } = useUserContext();

  const [changePassword, setChangePassword] = useState(false);
  const [changeAvatar, setChangeAvatar] = useState(false);

  return (
    <Box gap='medium'>
      <Card margin='medium' pad='medium'>
        <CardHeader align='start' direction='column' gap='xsmall'>
          <Heading level={2} size='small'>
            Profile details
          </Heading>
        </CardHeader>

        {!changePassword && !changeAvatar ? (
          <CardBody>
            <NameValueList pairProps={{ direction: 'row' }} gap='medium'>
              <NameValuePair name='Username'>
                <Text>{user?.username}</Text>
              </NameValuePair>

              <NameValuePair name='Password'>
                <Box direction='row' gap='small'>
                  <Text>*******</Text>
                  <Button label='Show' />
                  <Button label='Change password' onClick={() => setChangePassword(true)} />
                </Box>
              </NameValuePair>

              <NameValuePair name='Avatar'>
                <Box direction='row' gap='small'>
                  <Avatar src='/avatar.png' size='medium' />
                  <Button label='Change avatar' onClick={() => setChangeAvatar(true)} />
                </Box>
              </NameValuePair>
            </NameValueList>
          </CardBody>
        ) : (
          <>
            {changePassword && <PasswordChangeForm setChangePassword={setChangePassword} />}

            {changeAvatar && <AvatarChangeForm setChangeAvatar={setChangeAvatar} />}
          </>
        )}
      </Card>
    </Box>
  );
};

export default ProfileDetailCard;
