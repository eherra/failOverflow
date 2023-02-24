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
import { ContactInfo } from 'grommet-icons';
import PasswordChangeForm from './PasswordChangeForm';
import AvatarChangeForm from './AvatarChangeForm';
import { useUserContext } from '../../../../../context/UserContext';
import { AWS_URL } from '../../../../../utils/config';
import DeleteAvatarModal from './DeleteAvatarModal';

const ProfileDetailCard = () => {
  const { user } = useUserContext();

  const [changePassword, setChangePassword] = useState(false);
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [deleteAvatarModalShow, setDeleteAvatarModalShow] = useState<boolean>(false);

  return (
    <Box gap='medium'>
      <Card margin='medium' pad='medium'>
        <CardHeader align='start' gap='xsmall'>
          <Box direction='row' gap='small'>
            <Heading level={2} size='small'>
              <ContactInfo />
              &nbsp; Profile details
            </Heading>
          </Box>
        </CardHeader>

        {!changePassword && !changeAvatar ? (
          <CardBody>
            <NameValueList pairProps={{ direction: 'row' }} gap='medium'>
              <NameValuePair name='Username'>
                <Text>{user?.username}</Text>
              </NameValuePair>

              <NameValuePair name='Password'>
                <Box direction='row' gap='small'>
                  <Button label='Change password' onClick={() => setChangePassword(true)} />
                </Box>
              </NameValuePair>

              <NameValuePair name='Avatar'>
                <Box direction='row' gap='small'>
                  <Avatar
                    src={user?.avatarUrl ? `${AWS_URL}/${user.avatarUrl}` : '/defaultAvatar.jpeg'}
                    size='large'
                  />
                  <Box justify='center' direction='column' gap='small'>
                    <Button
                      label={user?.avatarUrl ? 'Change avatar' : 'Add avatar'}
                      onClick={() => setChangeAvatar(true)}
                    />
                    {user?.avatarUrl && (
                      <Button
                        color='#cd5c5c'
                        label='Remove avatar'
                        onClick={() => setDeleteAvatarModalShow(true)}
                      />
                    )}
                  </Box>
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
      {deleteAvatarModalShow && (
        <DeleteAvatarModal setDeleteAvatarModalShow={setDeleteAvatarModalShow} />
      )}
    </Box>
  );
};

export default ProfileDetailCard;
