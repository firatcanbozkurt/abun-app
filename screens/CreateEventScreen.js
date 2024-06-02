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
import { ButtonText, ButtonIcon, Button, AddIcon,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogBody,
Center,Heading,Icon,CloseIcon, ButtonGroup,
useToast,
Toast,
VStack,
ToastTitle,
ToastDescription,} from "@gluestack-ui/themed";
import AvatarIcon from "../components/AvatarIcon";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useAuth } from "../components/context/AuthProvider";
import { Dimensions } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import LottieView from "lottie-react-native";
import loadingAnimation from "../assets/loading.json";
const CreateEventScreen = ({ navigation }) => {
  const [eventImage, setEventImage] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventAbout, setEventAbout] = useState("");
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showAlertDialog, setShowAlertDialog] = useState(false)
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
    setSelectedDate(date);
    hideDatePicker();
  };

  const handleTimeConfirm = (time) => {
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
          delete result.cancelled;
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
    setLoading(true);
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

      console.log("Event created successfully:", data);
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="accent">
              <VStack space="xs">
                <ToastTitle>{eventName} has created</ToastTitle>
                <ToastDescription>
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });

      navigation.navigate("Home")
    } catch (error) {
      console.error("Error creating event:", error.message);
    } finally {
      setLoading(false);
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
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View className="flex justify-center items-center">
          <LottieView
            source={loadingAnimation}
            style={{ height: 100, aspectRatio: 1 }}
            autoPlay
            loop
          />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="flex-1">
      <View className="p-4">
        <View className="flex flex-row justify-between px-4 items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="flex mt-3 bg-dimgray p-2 rounded-tr-2xl rounded-bl-2xl ml-4  w-9"
          >
            <ArrowLeftIcon size="20" color="white" />
          </TouchableOpacity>
          <Text className="text-2xl mt-4 mr-1">Create Event</Text>
          <AvatarIcon navigation={navigation} />
        </View>
      </View>

      <View className="flex-1 ">
        <View className=" flex-1 justify-start items-center p-12">
          <View
            className="flex justify-center items-center border  mb-6"
            style={{ width: windowWidth * 0.5, height: windowHeight * 0.23 }}
          >
            <View className="flex justify-center items-center">
              <TouchableOpacity
                onPress={async () => {
                  const response = await selectImage();
                  if (response.eventImage) {
                    setEventImage(response?.eventImage);
                  }
                }}
              >
                {eventImage ? (
                  <Image
                    style={{
                      width: windowWidth * 0.5,
                      height: windowHeight * 0.23,
                      resizeMode: "contain",
                    }}
                    source={{ uri: eventImage?.assets[0]?.uri }}
                  />
                ) : (
                  <Text className="text-8xl font-thin">+</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

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

          <View className="flex flex-row justify-between  items-center p-6">
            <View className="mr-8">
              <Button onPress={showDatePicker}>
                <ButtonText>{`${selectedDate.toLocaleDateString()}`}</ButtonText>
              </Button>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={hideDatePicker}
              />
            </View>
            <View className="">
              <Button onPress={showTimePicker}>
                <ButtonText>
                  {" "}
                  {`${selectedTime.toLocaleTimeString()}`}
                </ButtonText>
              </Button>
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={hideTimePicker}
              />
            </View>
          </View>
        </View>
      </View>

      <SafeAreaView className="flex justify-center w-2/3 self-center">
      <Center h={200}>
      <Button sx={{w:"$90%", h:"$25%"}} onPress={() => setShowAlertDialog(true)}>
        <ButtonText>Create Event</ButtonText>
      </Button>
      <AlertDialog
        isOpen={showAlertDialog}
        onClose={() => {
          setShowAlertDialog(false)
        }}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">Create Event: {eventName}</Heading>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm">
              Are you sure you want to create event? 
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowAlertDialog(false)
                }}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                bg="$purple600"
                action="negative"
                onPress={() => {createEvent(); setShowAlertDialog(false);}} 
              >
                <ButtonText>Confirm</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Center>
      </SafeAreaView>
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
