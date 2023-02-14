import { FormField, TextInput } from 'grommet';

import { passwordRules, usernameRules } from '../../../../common/FormValidation';
import LabelWithInfoTip from '../../../../common/LabelWithInfoTip';

const UsernamePasswordForm = () => {
  return (
    <>
      <FormField
        required
        htmlFor='username'
        name='username'
        label={
          <LabelWithInfoTip
            text='Choose username'
            tipContent='Min. 4 characters'
            alignTipContent={{ align: { left: 'right' } }}
          />
        }
        validate={usernameRules}>
        <TextInput name='username' />
      </FormField>

      <FormField
        required
        htmlFor='password'
        name='password'
        label={
          <LabelWithInfoTip
            text='Choose password'
            tipContent='Min. 4 characters, one special character required'
            alignTipContent={{ align: { left: 'right' } }}
          />
        }
        validate={passwordRules}>
        <TextInput name='password' type='password' />
      </FormField>
    </>
  );
};

export default UsernamePasswordForm;
