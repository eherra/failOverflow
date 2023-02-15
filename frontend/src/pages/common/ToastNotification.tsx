import { Notification, Text, Box } from 'grommet';
import { Alert } from 'grommet-icons';

interface IToastNotification {
  icon?: JSX.Element;
  setIsVisible(data: boolean): any;
  toastMessage: string;
  isError: boolean;
}

const ToastNotification = ({ icon, setIsVisible, toastMessage, isError }: IToastNotification) => {
  return (
    <Notification
      time={5000}
      icon={isError ? <Alert color='#E34234' /> : icon}
      toast={{ position: 'top' }}
      message={<ToastMessage message={toastMessage} />}
      onClose={() => {
        setIsVisible(false);
      }}
    />
  );
};

const ToastMessage = ({ message }: { message: string }) => {
  return (
    <Box pad='xsmall'>
      <Text style={{ fontWeight: '400', font: 'Roboto' }}>{message}</Text>
    </Box>
  );
};

export default ToastNotification;
