import { Text, Box } from 'grommet';
import {
  StatusCritical
} from 'grommet-icons';

interface IErrorMessage {
  message: string
}

const ErrorMessage = ({ message }: IErrorMessage) => {
  return (
    <Box direction='row' gap='xsmall'>
      <StatusCritical />
      <Text>{message}</Text>
    </Box>
  )
}

export const confirmPasswordMatching = (newPassword: string, confirmPassword: string) => {
  return newPassword === confirmPassword
    ? undefined
    : { message: <ErrorMessage message="Passwords does not match" /> };
};

export const passwordRules = [
  {
    regexp: new RegExp('.{4,}'),
    message: <ErrorMessage message="Password should be at least four characters" />,
  },
  {
    regexp: new RegExp('(?=.*?[#?!@$ %^&*-])'),
    message: <ErrorMessage message="Password should have at least one special character" />,
  },
];

export const usernameRules = [
  {
    regexp: new RegExp(".{4,}"),
    message: <ErrorMessage message="Username should be at least four characters" />,
  },
  {
    regexp: new RegExp("(^[a-zA-Z0-9._]*$)"),
    message: <ErrorMessage message="Alphabets, numbers, dot and underscore are allowed" />,
  }
];
