import React, { createContext, useState } from 'react';

interface NotificationContextInterface {
  notification: { title: string; message: string; status: string } | null;
  showNotification: Function;
  hideNotification: Function;
}

const NotificationContext = createContext<NotificationContextInterface>({
  notification: null,
  showNotification: notificationData => {},
  hideNotification: () => {},
});

export const NotificationContextProvider: React.FC = ({ children }) => {
  const [activeNotification, setActiveNotification] = useState();

  function showNotification(notificationData) {
    setActiveNotification(notificationData);
    setTimeout(hideNotification, 2000);
  }

  function hideNotification() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification,
    hideNotification,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
