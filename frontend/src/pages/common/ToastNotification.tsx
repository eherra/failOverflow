import { Notification } from 'grommet';

interface IToastNotification {
  icon?: JSX.Element;
  setIsVisible(data: boolean): any;
  toastMessage: string;
}

const ToastNotification = ({ icon, setIsVisible, toastMessage }: IToastNotification) => {
  return (
    <Notification
      time={5000}
      icon={icon}
      toast={{ position: 'top' }}
      status='info'
      message={toastMessage}
      onClose={() => {
        setIsVisible(false);
      }}
    />
  );
};

export default ToastNotification;
