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
import { supabase } from "../supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { ButtonText, ButtonIcon, Button, AddIcon } from "@gluestack-ui/themed";
import AvatarIcon from "../components/AvatarIcon";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useAuth } from "../components/context/AuthProvider";
import { Dimensions } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { notifyUsersWithPushToken } from "../lib/nofitications";
const CreateEventScreen = ({ navigation }) => {
  const [eventImage, setEventImage] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventAbout, setEventAbout] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    console.warn("A date has been picked", date);
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleTimeConfirm = (time) => {
    console.warn("A time has been picked", time);
    setSelectedTime(time);
    hideTimePicker();
  };

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

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
  //db
  const formatCustomDateForText = (date, time) => {
    const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      date
    );
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    const ampm = time.getHours() >= 12 ? "PM" : "AM";

    return `${month} ${day}, ${hours}:${minutes} ${ampm}`;
  };

  const uploadFromURI = async (result) => {
    if (!result || result.canceled) {
      return null;
    }

    try {
      const { uri, mediaType } = result.assets[0];
      const ext = uri.substring(uri.lastIndexOf(".") + 1);
      const fileName = result.assets[0].uri.replace(/^.*[\\\/]/, "");
      const formData = new FormData();
      formData.append("files", {
        uri: result.assets[0].uri,
        name: `${fileName}.${ext}`,
        type: mediaType ? mediaType : `image/${ext}`,
      });

      const { data, error } = await supabase.storage
        .from("event_images")
        .upload(`${fileName}.${ext}`, formData);

      if (error) {
        throw new Error(error.message);
      }

      return { eventImage: data };
    } catch (error) {
      console.error("Error uploading image:", error.message);
      return null;
    }
  };

  const selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 0.1,
      });
      if (result) {
        if (!result.canceled) {
          setEventImage(result);
          console.log(result);
          return result;
        } else {
          throw new Error("Image selection canceled");
        }
      } else {
        throw new Error("Image selection result is null");
      }
    } catch (error) {
      console.error("Error selecting image:", error.message);
    }
  };

  const createEvent = async () => {
    try {
      const formattedDate = formatCustomDateForText(selectedDate, selectedTime);
      const uploadedImage = await uploadFromURI(eventImage);
      const imagePath = uploadedImage.eventImage.fullPath.replace(
        "event_images/",
        ""
      );
      const { data, error } = await supabase.from("eventTest").insert([
        {
          eventImage: imagePath,
          eventName,
          eventAbout,
          date: formattedDate,
        },
      ]);

      if (error) {
        console.error("Error creating event:", error.message);
        return;
      }
      /* SEND NOTIFICATIONS TO USERS WHO MEMBERS OF THIS COMMUNITY */
      /* TAKES communityId, title, body AS PARAMETERS */
      notifyUsersWithPushToken("5", eventName, eventAbout);
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
              <Button onPress={showDatePicker}>
                <ButtonText>Select Date</ButtonText>
              </Button>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />
            </View>
            <View className="flex flex-row items-center">
              <Button onPress={showTimePicker}>
                <ButtonText>Select Date</ButtonText>
              </Button>
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
              />
            </View>
            <Text>{`${selectedDate.toLocaleDateString()} ${selectedTime.toLocaleTimeString()}`}</Text>
          </View>

          <View className="items-center">
            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              style={{ borderRadius: 25 }}
              onPress={async () => {
                const response = await selectImage();
                if (response.eventImage) {
                  setEventImage(response?.eventImage);
                }
              }}
            >
              <ButtonText>Select Image </ButtonText>
              <ButtonIcon as={AddIcon} />
            </Button>
          </View>
          {eventImage ? (
            <Image
              style={{
                width: windowWidth,
                height: windowHeight * 0.4,
                resizeMode: "contain",
              }}
              source={{ uri: eventImage.assets[0].uri }}
            />
          ) : null}
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
