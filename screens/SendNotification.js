import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import {
  Button,
  Icon,
  ButtonText,
  FabLabel,
  Input,
  InputField,
  ButtonSpinner,
} from "@gluestack-ui/themed";
import {
  notifyUsersWithPushToken,
  adminNotifyAllUsers,
} from "../lib/nofitications";
const SendNotificaiton = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [disabled, setDisabled] = useState(false);
  // notifyUsersWithPushToken("5", "TITLE", "BODY");
  const notifyAllUsers = () => {
    setDisabled(true);
    //adminNotifyAllUsers(title, body);
    setTimeout(() => {
      setDisabled(false);
    }, 3000);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingLeft: "5%",
          paddingTop: "5%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>
          Send notification to all users
        </Text>
      </View>
      <View style={{ marginHorizontal: "5%", marginTop: "5%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        ></View>
        <View // Horizontal line
          style={{
            width: "100%",
            borderBottomColor: "#B8B9BC",
            opacity: 0.5,
            borderBottomWidth: 1.5,
            alignSelf: "center",
          }}
        />
      </View>

      <View style={{ padding: 16 }}>
        <View style={{ marginTop: 8 }}>
          <FabLabel style={{ color: "black", marginLeft: 2, marginBottom: 2 }}>
            Title:
            <Text style={{ color: "#640D6B", fontStyle: "italic" }}>
              {" "}
              *MAX : 20 Character{" "}
            </Text>
          </FabLabel>

          <Input
            variant="outline"
            size="md"
            isDisabled={disabled}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputField
              onChangeText={(e) => setTitle(e)}
              placeholder="Enter The Title"
            />
          </Input>
        </View>
        <View style={{ marginTop: 24 }}>
          <FabLabel style={{ color: "black", marginLeft: 2, marginBottom: 2 }}>
            Body:{" "}
            <Text style={{ color: "#640D6B", fontStyle: "italic" }}>
              {" "}
              *Brief description{" "}
            </Text>
          </FabLabel>

          <Input
            variant="outline"
            size="md"
            isDisabled={disabled}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputField
              onChangeText={(e) => setBody(e)}
              placeholder="Enter The Body"
            />
          </Input>
        </View>
      </View>

      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button isDisabled={disabled}>
          {!disabled ? (
            <ButtonText onPress={notifyAllUsers} size="lg">
              Send Notification
            </ButtonText>
          ) : (
            <ButtonText size="lg">
              Sending <ButtonSpinner />
            </ButtonText>
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SendNotificaiton;
