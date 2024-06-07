import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
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
import { ArrowLeftIcon } from "react-native-heroicons/solid";

const SendNotificaiton = ({navigation}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [disabled, setDisabled] = useState(false);
  // notifyUsersWithPushToken("5", "TITLE", "BODY");
  const notifyAllUsers = () => {
    if (title.length < 1 || body.length < 1) {
      return alert("Please fill all the fields");
    }
    setDisabled(true);
    adminNotifyAllUsers(title, body);
    setTimeout(() => {
      setDisabled(false);
    }, 3000);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          paddingTop: "5%",
          display: "flex",
        }}
      >
         <View className="flex flex-row justify-between px-4 items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-tblack p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-4 w-9"
            style={{backgroundColor:"#000000"}}
          >
            <ArrowLeftIcon size="20" color="white" />
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 32, fontWeight: "bold", paddingLeft:"7%", paddingTop:"5%" }}>
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

      <View style={{ padding: 24 }}>
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
          paddingTop: "3%"
        }}
      >
        <Button isDisabled={disabled}>
          {!disabled ? (
            <ButtonText onPress={notifyAllUsers} size="lg">
              Send Notification
            </ButtonText>
          ) : (
            <ButtonText
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "centerß",
              }}
              size="lg"
            >
              Sending <ButtonSpinner />
            </ButtonText>
          )}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default SendNotificaiton;
