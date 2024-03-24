import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  FormControl,
  FormGroup,

} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { supabase } from "../supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { ButtonText, ButtonIcon, Button, AddIcon } from "@gluestack-ui/themed";
import AvatarIcon from "../components/AvatarIcon";
import * as FileSystem from 'expo-file-system';
import {decode} from 'base64-arraybuffer';
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useAuth } from "../components/context/AuthProvider";

const CreateEventScreen = ({ navigation }) => {
  const [eventImage, setEventImage] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventAbout, setEventAbout] = useState("");
  const [date, setDate] = useState(new Date());
  const {user} = useAuth();
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

  const uploadFromURI = async (result) => {
    if (!result || result.canceled) {
      return null;
    }
    if(!result.canceled){
      const ext = result.assets[0].uri.substring(result.assets[0].uri.lastIndexOf(".") + 1);

      const fileName = result.assets[0].uri.replace(/^.*[\\\/]/,"");

      var formData = new FormData();
      formData.append("files", {
        uri: result.assets[0].uri,
        name: fileName,
        type: result.assets[0].mediaType ? `image/${ext}` : `video/${ext}`,
      });
      const {data, error} =  await supabase.storage.from("event_images").upload(fileName,formData);
     
      if( error) throw new Error(error.message);

      return { eventImage: data};
    }else{
      return result;
    }
  }
  
  const selectImage = async () =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4,3],
        quality: 0.1,
      })
      if(!result.canceled){
        setEventImage(result);

      }else
      {
        return error
      }
  }
/*
  try{
    return await uploadFromURI(eventImage);

  }catch(e){
    ErrorAlert({title: "Image upload" , message: e.message});
    return null;
  }
  */
  const createEvent = async () => {
    try {
      const formattedDate = formatCustomDateForText(date);
      const uploadedImage = await uploadFromURI(eventImage);
      const imagePath = uploadedImage.eventImage.fullPath.replace("event_images/", "");
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
            
            <Text>{date.toLocaleString()}</Text>
          </View>

          <View className="items-center">
            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              onPress={selectImage}
              style={{ borderRadius: 25 }}
            >
              <ButtonText>Select Image </ButtonText>
              <ButtonIcon as={AddIcon} />
            </Button>
            <TouchableOpacity onPress={async () => {
              const response = await selectImage();
            if(response.eventImage){
              setEventImage(response?.eventImage)
            }
            }}>
              <Text>image</Text>
            </TouchableOpacity>
          </View>
          {eventImage ? (
            <Image
              source={{ uri: eventImage }}
              style={{ width: 150, height: 150 }}
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
