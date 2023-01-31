import { Text, Box } from 'grommet';
import { StatusCritical } from 'grommet-icons';

const ErrorMessage = ({ message }: IErrorMessage) => {
  return (
    <Box direction='row' gap='xsmall'>
      <StatusCritical />
      <Text>{message}</Text>
    </Box>
  );
};

interface IErrorMessage {
  message: string;
}

interface IConfirmStringMatching {
  firstString: string;
  secondString: string;
  errorText: string;
}

export const confirmStringMatching = ({ firstString, secondString, errorText }: IConfirmStringMatching) => {
  return firstString === secondString ? undefined : { message: <ErrorMessage message={errorText} /> };
};

export const passwordRules = [
  {
    regexp: new RegExp('.{4,}'),
    message: <ErrorMessage message='Password should be at least four characters' />,
  },
  {
    regexp: new RegExp('(?=.*?[#?!@$ %^&*-])'),
    message: <ErrorMessage message='Password should have at least one special character' />,
  },
];

export const usernameRules = [
  {
    regexp: new RegExp('.{4,}'),
    message: <ErrorMessage message='Username should be at least four characters' />,
  },
  {
    regexp: new RegExp('(^[a-zA-Z0-9._]*$)'),
    message: <ErrorMessage message='Alphabets, numbers, dot and underscore are allowed' />,
  },
];
