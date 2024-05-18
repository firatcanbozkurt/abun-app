import { View, Text } from "react-native";
import React from "react";
import { Button } from "@gluestack-ui/themed";
import {
  notifyUsersWithPushToken,
  adminNotifyAllUsers,
} from "../lib/nofitications";
const SendNotificaiton = () => {
  return (
    <View>
      <Text>SendNotificaiton</Text>
      <Button
        onPress={() => {
          adminNotifyAllUsers("TITLE", "BODY");
        }}
      ></Button>
      <Button
        onPress={() => {
          notifyUsersWithPushToken("5", "TITLE", "BODY");
        }}
      ></Button>
    </View>
  );
};

export default SendNotificaiton;
