import { Fragment, useContext } from "react";

import NotificationContext from "../../store/notification-context";

import MainHeader from "./main-header";
import Notification from "../ui/notification";

function Layout(props) {
  const notificationCtx = useContext(NotificationContext);

  const activeNotification = notificationCtx.notification;

  console.log(activeNotification);

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          status={activeNotification.status}
          message={activeNotification.message}
        />
      )}
    </Fragment>
  );
}

export default Layout;
