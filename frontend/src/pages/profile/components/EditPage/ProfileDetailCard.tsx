
import React, { useState } from 'react';
import {
  Box,
  Button,
  NameValueList,
  NameValuePair,
  Heading,
  Text,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Avatar
} from 'grommet';

import PasswordChangeForm from './PasswordChangeForm';

const ProfileDetailCard = () => {
  const [changePassword, setChangePassword] = useState(false);
  const [changeAvatar, setChangeAvatar] = useState(false);


  return (
    <Box gap="medium">
      <Card
        margin="medium"
        pad="medium"
      >
        <CardHeader align="start" direction="column" gap="xsmall">
          <Heading level={2} size="small">
            Profile details
          </Heading>
        </CardHeader>

        {!changePassword && !changeAvatar ? (
          <CardBody>
            <NameValueList pairProps={{ direction: 'row' }} gap="medium">

              <NameValuePair name="Username">
                <Text>hessu</Text>
              </NameValuePair>

              <NameValuePair name="Password">
                <Box direction='row' gap='small'>
                  <Text>*******</Text>
                  <Button label="Show" />
                  <Button
                    label="Change password"
                    onClick={() => setChangePassword(true)} />
                </Box>
              </NameValuePair>

              <NameValuePair name="Avatar">
                <Box direction='row' gap='small'>
                  <Avatar src="/avatar.png" size="medium" />
                  <Button label="Change avatar" />
                </Box>
              </NameValuePair>
            </NameValueList>
          </CardBody>
        ) : (
          <>
            {changePassword &&
              <PasswordChangeForm setChangePassword={setChangePassword} />
            }

            {changeAvatar &&
              <p>avatar change</p>
            }
          </>
        )}
      </Card>
    </Box>
  );
};

export default ProfileDetailCard;