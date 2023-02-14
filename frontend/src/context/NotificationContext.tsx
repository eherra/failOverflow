import { useState, createContext, ReactNode, useContext } from 'react';
import ToastNotification from '../pages/common/ToastNotification';

interface INotificationValues {
  message: string;
  isError: boolean;
  icon?: JSX.Element;
}

interface INotificationContext {
  setIsVisible: (isLoading: boolean) => void;
  createNotification: (data: INotificationValues) => void;
}

interface INotificationProvider {
  children: ReactNode;
}

export const NotificationContext = createContext<INotificationContext>({
  setIsVisible: (isVisible: boolean) => null,
  createNotification: () => null,
});

export const NotificationProvider = ({ children }: INotificationProvider) => {
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

  return (
    <NotificationContext.Provider value={{ setIsVisible, createNotification }}>
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
