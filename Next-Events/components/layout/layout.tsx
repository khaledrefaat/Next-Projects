import { useContext } from 'react';
import NotificationContext from '../../store/notification-context';
import Notification from '../Ui/notification';
import Header from './header';

const Layout = ({ children }) => {
  const NotificationCtx = useContext(NotificationContext);

  const activeNotification = NotificationCtx.notification;

  return (
    <>
      <Header />
      <main>
        {children}
        {activeNotification && (
          <Notification
            title={activeNotification.title}
            message={activeNotification.message}
            status={activeNotification.status}
          />
        )}
      </main>
    </>
  );
};

export default Layout;
