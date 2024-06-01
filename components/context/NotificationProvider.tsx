import { registerForPushNotificationsAsync } from "../../lib/nofitications";
import { ExpoPushToken } from "expo-notifications";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import * as Notifications from "expo-notifications";
import { useAuth } from "./AuthProvider";
import { supabase } from "../../supabase";
const NotificationProvider = ({ children }: PropsWithChildren) => {
  const { session } = useAuth();
  const [expoPushToken, setExpoPushToken] = useState<String | undefined>();
  const [notification, setNotification] =
    useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const savePushToken = async (newToken: string | undefined) => {
    setExpoPushToken(newToken);
    if (!newToken) {
      return;
    }
    console.log("SAVING TOKEN: :", session.user.id, newToken);

    await supabase
      .from("users")
      .update({ expo_push_token: newToken })
      .eq("uuid", session.user.id);
  };
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => savePushToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  //confirm.log(notification);
  console.log(expoPushToken);

  return <>{children}</>;
};

export default NotificationProvider;
