import { useState, createContext, ReactNode, useContext } from 'react';
import ToastNotification from '../pages/common/ToastNotification';
import { useUserContext } from './UserContext';

interface INotificationProvider {
  children: ReactNode;
}

interface INotificationValues {
  message: string;
  isError: boolean;
  icon?: JSX.Element;
}

interface INotificationContext {
  setIsVisible: (isLoading: boolean) => void;
  createNotification: (data: INotificationValues) => void;
  handleErrorNotification: (err: any) => void;
}

export const NotificationContext = createContext<INotificationContext>({
  setIsVisible: (isVisible: boolean) => null,
  createNotification: () => null,
  handleErrorNotification: (err: any) => null,
});

export const NotificationProvider = ({ children }: INotificationProvider) => {
  const { handleLogout } = useUserContext();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [toastIcon, setToastIcon] = useState<JSX.Element>();

  const createNotification = ({ message, icon, isError }: INotificationValues) => {
    setToastMessage(message);
    setToastIcon(icon);
    setIsError(isError);
    setIsVisible(true);
  };

  const handleErrorNotification = (error: any) => {
    const { data } = error.response;
    switch (data?.name) {
      case 'TokenExpiredError':
        createNotification({ message: 'Your session has been expired!', isError: true });
        handleLogout();
        break;
      case 'ValidationError':
        if (data?.error?.includes('User validation failed: username')) {
          createNotification({ message: 'Username already taken!', isError: true });
        } else {
          createNotification({ message: 'Something went wrong! Try again later.', isError: true });
        }
        break;
      case 'UnauthorizedPasswordChange':
        createNotification({
          message: 'Password change failed! Provided current password was not correct.',
          isError: true,
        });
        break;
      case 'UnauthorizedLoginAttempt':
        createNotification({ message: 'Wrong username or password!', isError: true });
        break;
      default:
        createNotification({ message: 'Something went wrong! Try again later.', isError: true });
    }
  };

  return (
    <NotificationContext.Provider
      value={{ setIsVisible, createNotification, handleErrorNotification }}>
      {isVisible && (
        <ToastNotification
          setIsVisible={setIsVisible}
          toastMessage={toastMessage}
          icon={toastIcon}
          isError={isError}
        />
      )}
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);
