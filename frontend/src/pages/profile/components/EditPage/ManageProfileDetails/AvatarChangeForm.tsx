import React, { useState, useContext } from 'react';
import { Box, Button, Form, ResponsiveContext } from 'grommet';

import AvatarForm from '../../../../auth/pages/register/components/AvatarForm';

interface IAvatarChangeForm {
  setChangeAvatar(boolean: any): void;
}

const AvatarChangeForm = ({ setChangeAvatar }: IAvatarChangeForm) => {
  const screenSize = useContext(ResponsiveContext);
  const [avatarValue, setAvatarValue] = useState();

  const handleAvatarChangeSubmit = (value: any, touched: any) => {
    console.log('call api here');
  };

  return (
    <Box gap='medium' width='medium' pad={{ horizontal: 'xxsmall' }}>
      <Form
        value={avatarValue}
        onChange={(value) => setAvatarValue(value)}
        onSubmit={({ value, touched }) => handleAvatarChangeSubmit(value, touched)}
        method='post'>
        <AvatarForm tipContent='Max 2.5MB' />
        <Box
          align={['xsmall', 'small'].includes(screenSize) ? undefined : 'start'}
          pad={{ top: 'xxsmall' }}
          gap='small'
          direction='row'>
          <Button label='Change avatar' primary type='submit' />
          <Button
            label='Cancel'
            onClick={() => {
              setChangeAvatar(false);
            }}
          />
        </Box>
      </Form>
    </Box>
  );
};

export default AvatarChangeForm;
