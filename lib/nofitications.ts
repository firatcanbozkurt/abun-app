import { useState, useEffect, useRef } from "react";
import { Text, View, Button, Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { supabase } from "../supabase";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
async function sendPushNotification(
  expoPushToken: string,
  title: string,
  body: string
) {
  const message = {
    to: expoPushToken,
    sound: "default",
    title,
    body,
    data: { someData: "goes here" },
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
}

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas.projectId,
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

export const getUsersTokenForEvents = async (communityId: string) => {
  const { data, error } = await supabase
    .from("community_members")
    .select("user")
    .eq("community", communityId);

  if (error) {
    console.error(error);
    return [];
  }

  const userTokens = await Promise.all(
    data.map(async (uuid) => {
      const { data, error } = await supabase
        .from("users")
        .select("expo_push_token")
        .eq("uuid", uuid.user)
        .single();

      if (error) {
        console.error(error);
        return null;
      }

      return data.expo_push_token;
    })
  );

  return userTokens.filter(Boolean); // remove null values
};

export const getAllUsersToken = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("expo_push_token");
  return data;
};

export const notifyUsersWithPushToken = async (
  communityId: string,
  title: string,
  body: string
) => {
  await getUsersTokenForEvents(communityId).then((data) => {
    data.forEach((expo_push_token) => {
      sendPushNotification(expo_push_token, title, body);
    });
  });
};

export const adminNotifyAllUsers = async (title: string, body: string) => {
  const data = await getAllUsersToken();
  data.forEach((user) => {
    sendPushNotification(user.expo_push_token, title, body);
  });
};
