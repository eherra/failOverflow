import {
  FormField,
  TextInput
} from 'grommet';

import { passwordRules, usernameRules } from '../FormValidation';

const UsernamePasswordForm = () => {
  return (
    <>
      <FormField
        required
        htmlFor="username"
        name="username"
        label="Username"
        validate={usernameRules}
      >
        <TextInput
          name="username"
        />
      </FormField>

      <FormField
        htmlFor="password"
        name="password"
        label="Password"
        validate={passwordRules}
        required
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