import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import {
  Button,
  ButtonText,
  Input,
  InputField,
  Textarea,
  TextareaInput,
  FabLabel,
  Icon,
  CheckIcon,
  CloseIcon,
} from "@gluestack-ui/themed";
import { supabase } from "../supabase";
import * as ImagePicker from "expo-image-picker";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
const CreateAnnouncementsScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImage(result.assets[0].uri);
  };

  const generateFormData = () => {
    const ext = image.substring(image.lastIndexOf(".") + 1);
    const fileName = image.replace(/^.*[\\\/]/, "");
    console.log(fileName);
    const formData = new FormData();
    const date = new Date();
    const stringDate = (
      date.getMilliseconds() *
      (Math.random() + 1000)
    ).toString();
    formData.append("files", {
      uri: image,
      name: `${stringDate}-${fileName}`,
      type: `image/${ext}`,
    });
    return [formData, `${stringDate}-${fileName}`];
  };
  const addAnnouncement = async () => {
    console.log("URLLL", url);
    setDisabled(true);
    if (title.length > 0 && body.length > 0 && image && url.length === 0) {
      const [formData, name] = generateFormData();

      await supabase
        .from("announcements")
        .insert([{ title, body, src_image: name }]);
      await supabase.storage.from("announcements").upload(name, formData);

      navigation.goBack();
      return;
    }
    if (title.length > 0 && body.length > 0 && image && url.length > 0) {
      const [formData, name] = generateFormData();
      await supabase
        .from("announcements")
        .insert([{ title, body, src_image: name, url }]);
      await supabase.storage.from("announcements").upload(name, formData);
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
    <SafeAreaView style={{ marginTop: 24 }}>
      <View className="flex flex-row justify-between px-4 items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className=" p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-4 w-9"
            style={{backgroundColor:"#000000"}}
          >
            <ArrowLeftIcon size="20" color="white" />
            
          </TouchableOpacity>
        </View>
      <View
        style={{
          padding: "8%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>
          Create Announcement
        </Text>
      </View>
      <View style={{ padding: 24 }}>
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
              *Image
            </FabLabel>
          </View>
          <View
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button isDisabled={disabled} onPress={pickImage}>
              <ButtonText size="lg">Pick an image</ButtonText>
            </Button>
            <Text>{image ? "Image selected" : "No Image selected"}</Text>
            {image ? (
              <View
                style={{
                  borderColor: "green",
                  borderWidth: 4,
                  borderRadius: 8,
                }}
              >
                <Icon as={CheckIcon} m="$2" w="$8" h="$8" />
              </View>
            ) : (
              <View
                style={{
                  borderColor: "red",
                  borderWidth: 4,
                  borderRadius: 8,
                }}
              >
                <Icon as={CloseIcon} m="$2" w="$8" h="$8" />
              </View>
            )}
          </View>
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
          <Button isDisabled={disabled} onPress={addAnnouncement}>
            {disabled ? (
              <>
                <ButtonText>Adding...</ButtonText>
                <ActivityIndicator size="large" color="white" />
              </>
            ) : (
              <ButtonText size="lg">Add Announcement</ButtonText>
            )}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateAnnouncementsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});
