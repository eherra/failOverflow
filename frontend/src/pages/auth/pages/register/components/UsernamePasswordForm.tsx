import {
  FormField,
  TextInput
} from 'grommet';

import { passwordRules, usernameRules } from '../../../../common/FormValidation';
import LabelWithInfoTip from './LabelWithInfoTip';

const UsernamePasswordForm = () => {
  return (
    <>
      <FormField
        required
        htmlFor="username"
        name="username"
        label={<LabelWithInfoTip
          text="Choose username"
          tipContent="Min. 4 characters" />}
        validate={usernameRules}
      >
        <TextInput
          name="username"
        />
      </FormField>

      <FormField
        required
        htmlFor="password"
        name="password"
        label={<LabelWithInfoTip
          text="Choose password"
          tipContent="Min. 4 characters, one special character required" />}
        validate={passwordRules}
      >
        <TextInput
          name="password"
          type="password"
        />
      </FormField>
    </>
  )
}

export default UsernamePasswordForm;