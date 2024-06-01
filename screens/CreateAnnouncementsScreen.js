import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import {
  Button,
  ButtonText,
  Input,
  InputField,
  Textarea,
  TextareaInput,
  FabLabel,
} from "@gluestack-ui/themed";
import { supabase } from "../supabase";
import { set } from "date-fns";

const CreateAnnouncementsScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");
  const [disabled, setDisabled] = useState(false);
  const addAnnouncement = async () => {
    setDisabled(true);
    if (title.length > 0 && body.length > 0 && url.length === 0) {
      await supabase.from("announcements").insert([{ title, body }]);
      navigation.goBack();
      return;
    }

    if (title.length > 0 && body.length > 0 && url.length > 0) {
      await supabase.from("announcements").insert([{ title, body, url }]);
      navigation.goBack();
      return;
    }
    setTitle("");
    setBody("");
    setUrl("");
    setDisabled(false);
    alert("Please fill all the fields, URL is optional");
  };
  return (
    <SafeAreaView>
      <View
        style={{
          padding: "5%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>
          Create Announcement
        </Text>
      </View>
      <View style={{ padding: 16 }}>
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",

              alignItems: "center",
            }}
          >
            <FabLabel
              style={{ color: "black", marginLeft: 2, marginBottom: 2 }}
            >
              *Title
            </FabLabel>
          </View>
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

        <View style={{ marginTop: 16 }}>
          <View>
            <FabLabel
              style={{ color: "black", marginLeft: 2, marginBottom: 2 }}
            >
              *Body
            </FabLabel>
          </View>
          <Textarea
            size="md"
            isReadOnly={false}
            isInvalid={false}
            isDisabled={disabled}
            w="$full"
            h={200}
          >
            <TextareaInput
              onChangeText={(e) => setBody(e)}
              placeholder="Your text goes here..."
            />
          </Textarea>
        </View>
        <View style={{ marginTop: 16 }}>
          <View>
            <FabLabel
              style={{ color: "black", marginLeft: 2, marginBottom: 2 }}
            >
              URL
            </FabLabel>
          </View>
          <Input
            variant="outline"
            size="md"
            isDisabled={disabled}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputField
              onChangeText={(e) => setUrl(e)}
              placeholder="Enter The URL if any"
            />
          </Input>
        </View>
        <View style={{ marginTop: 16 }}>
          <Button onPress={addAnnouncement}>
            <ButtonText size="lg">Add Announcement</ButtonText>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateAnnouncementsScreen;
