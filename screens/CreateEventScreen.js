import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { supabase } from "../supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { ButtonText, ButtonIcon, Button, AddIcon } from "@gluestack-ui/themed";
import AvatarIcon from "../components/AvatarIcon";

import { ArrowLeftIcon } from "react-native-heroicons/solid";

const CreateEventScreen = ({ navigation }) => {
  const [eventImage, setEventImage] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventAbout, setEventAbout] = useState("");
  const [date, setDate] = useState(new Date());

  const [loading, setLoading] = useState();
  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Media library access needed to pick an image.");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uploadedImageUrl = await uploadImageToStorage(result.assets[0]);

        if (uploadedImageUrl) {
          setEventImage(uploadedImageUrl);
        }
      }
    } catch (error) {
      console.error("Error picking an image:", error);
    }
  };

  const uploadImageToStorage = async (imageUri) => {
    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const { data, error } = await supabase.storage
        .from("event_images") // Depo adınızı buraya ekleyin
        .upload(`images/${Date.now()}.jpg`, blob, {
          contentType: "image/jpeg",
        });

      if (error) {
        console.error("Error uploading image:", error.message);
        return null;
      }

      return data[0].url;
    } catch (error) {
      console.error("Error uploading image:", error.message);
      return null;
    }
  };

  //db
  const formatCustomDateForText = (date) => {
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = date.getHours() >= 12 ? "PM" : "AM";

    return `${month} ${day}, ${hours}:${minutes} ${ampm}`;
  };
  const createEvent = async () => {
    try {
      const formattedDate = formatCustomDateForText(date);

      const { data, error } = await supabase.from("eventTest").insert([
        {
          eventImage,
          eventName,
          eventAbout,
          date: formattedDate,
        },
      ]);

      if (error) {
        console.error("Error creating event:", error.message);
        return;
      }

      console.log("Event created successfully:", data);
      Alert.alert("Success", "Event created successfully", [
        { text: "OK", onPress: () => navigation.navigate("Home") },
      ]);
    } catch (error) {
      console.error("Error creating event:", error.message);
    }
    if (loading) {
      return (
        <SafeAreaView className="flex-1 justify-center items-center">
          <Text>Loading...</Text>
        </SafeAreaView>
      );
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="flex-1">
      <View className="p-4">
        <View className="flex flex-row justify-between px-4 items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-secondary p-2 rounded-tr-2xl rounded-bl-2xl ml-4  w-9"
          >
            <ArrowLeftIcon size="20" color="white" />
          </TouchableOpacity>
          <AvatarIcon navigation={navigation} />
        </View>
        <View className="p-4">
          <View className="flex-row justify-center items-center">
            <Text className="text-2xl mt-4 mr-1">Create Event</Text>
          </View>
        </View>
      </View>
      <View className="flex-1 ">
        <View className=" flex-1 justify-start items-center p-12">
          <TextInput
            placeholder="Event Name"
            value={eventName}
            onChangeText={setEventName}
            style={styles.input}
          />
          <TextInput
            placeholder="Event About"
            value={eventAbout}
            onChangeText={setEventAbout}
            style={styles.input}
          />

          <View className="flex  items-center p-6">
            <View className="flex flex-row  items-center ">
              <Text>Select Date</Text>
              <DateTimePicker
                value={date}
                mode={"date"}
                display="default"
                is24Hour={true}
                onChange={onChange}
              />
            </View>
            <View className="flex flex-row items-center">
              <Text>Select Time</Text>
              <DateTimePicker
                value={date}
                mode={"time"}
                display="default"
                is24Hour={true}
                onChange={onChange}
                style={{ marginVertical: 20 }}
              />
            </View>
            <Text>{date.toLocaleString()}</Text>
          </View>

          <View className="items-center">
            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              onPress={pickImage}
              style={{ borderRadius: 25 }}
            >
              <ButtonText>Select Image </ButtonText>
              <ButtonIcon as={AddIcon} />
            </Button>
          </View>
          {eventImage ? <Image source={{ uri: eventImage }} /> : null}
        </View>
      </View>

      <View className="flex justify-center w-2/3 self-center">
        <Button
          title="Create Event"
          onPress={createEvent}
          style={{ borderRadius: 25 }}
        >
          <ButtonText>Create Event</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
export default CreateEventScreen;
