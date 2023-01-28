import {
  FormField,
  TextInput,
} from 'grommet';

const passwordRules = [
  {
    regexp: new RegExp('.{4,}'),
    message: 'At least four characters',
    status: 'error',
  },
  {
    regexp: new RegExp('(?=.*?[#?!@$ %^&*-])'),
    message: 'At least one special character or space',
    status: 'error',
  },
];

const usernameRules = [
  {
    regexp: new RegExp('.{4,}'),
    message: 'At least four characters',
    status: 'error',
  },
  {
    regexp: new RegExp('(^[a-zA-Z0-9._]*$)'),
    message: 'Alphabets, numbers, dot (.) and underscore (_) allowed',
    status: 'error',
  },
];

const UsernamePasswordForm = () => {
  return (
    <>
      <FormField
        required
        htmlFor="name"
        name="name"
        label="Username"
      //validate={usernameRules}
      >
        <TextInput
          id="name"
          name="name"
        />
      </FormField>

      <FormField
        htmlFor="password"
        name="password"
        label="Password"
        //validate={passwordRules}
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