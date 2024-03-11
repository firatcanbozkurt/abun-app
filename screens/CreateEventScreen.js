import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Image, Text, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { supabase } from "../supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

const CreateEventScreen = ({ navigation }) => {
  const [eventImage, setEventImage] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventAbout, setEventAbout] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const onChange = (event, selectedDate) => {
    setDate(selectedDate);
    setShow(false);
  };

  const showMode = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
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
  };

  return (
    <SafeAreaView>
      <View>
        <TextInput
          placeholder="Event Image URL"
          value={eventImage}
          onChangeText={setEventImage}
        />
        <TextInput
          placeholder="Event Name"
          value={eventName}
          onChangeText={setEventName}
        />
        <TextInput
          placeholder="Event About"
          value={eventAbout}
          onChangeText={setEventAbout}
        />

        <Button title="Select Date" onPress={() => showMode("date")} />
        <Button title="Select Time" onPress={() => showMode("time")} />
        <Button title="Select Image" onPress={pickImage} />

        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            display="default"
            is24Hour={true}
            onChange={onChange}
          />
        )}

        <Text>{date.toLocaleString()}</Text>

        {eventImage ? (
          <Image
            source={{ uri: eventImage }}
            style={{ width: 200, height: 200 }}
          />
        ) : null}

        <Button title="Create Event" onPress={createEvent} />
      </View>
    </SafeAreaView>
  );
};

export default CreateEventScreen;
