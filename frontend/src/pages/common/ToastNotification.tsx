import { Notification } from 'grommet';
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
      icon={isError ? <Alert /> : icon}
      toast={{ position: 'top' }}
      message={toastMessage}
      onClose={() => {
        setIsVisible(false);
      }}
    />
  );
};

export default ToastNotification;
