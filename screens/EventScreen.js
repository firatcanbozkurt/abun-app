import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  HStack,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Button,
  ButtonText,
  ButtonIcon,
  Box,
  useToast,
  Toast,
  VStack,
  ToastTitle,
  ToastDescription,
} from "@gluestack-ui/themed";

import React, { useEffect, useState } from "react";
import { supabase } from "../supabase";

import { ArrowRightIcon, ArrowLeftIcon } from "react-native-heroicons/solid";
import { set } from "date-fns";
import LottieView from "lottie-react-native";
import loadingAnimation from "../assets/loading.json";
import { useAuth } from "../components/context/AuthProvider";
import AvatarIcon from "../components/AvatarIcon";

const EventScreen = ({ navigation, route }) => {
  const toast = useToast();
  const { session } = useAuth();
  const userId = session?.user?.id;
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [attendingEvent, setAttendingEvent] = useState(false);
  const [joinedEvent, setJoinedEvent] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const fetchEventData = async () => {
      const eventDataParams = await route.params?.eventData;
      setEventData(eventDataParams);
    };
    //setLoading(false);
    fetchEventData();
  }, []);
  useEffect(() => {
    if (!eventData) return;
    const isUserJoinedEvent = async () => {
      const { data, error } = await supabase
        .from("events_users")
        .select("*")
        .eq("eventId", eventData?.id)
        .eq("user", userId);
      if (error) {
        return;
      }
      setJoinedEvent(data.length > 0);
      setLoading(false);
    };

    isUserJoinedEvent();
  }, [eventData]);

  const attendEvent = async () => {
    setAttendingEvent(true);
    await supabase.from("events_users").insert([{ eventId: eventData?.id }]);
    setJoinedEvent(true);
    setAttendingEvent(false);
    toast.show({
      placement: "top",
      render: ({ id }) => {
        const toastId = "toast-" + id;
        return (
          <Toast nativeID={toastId} action="success" variant="accent">
            <VStack space="xs">
              <ToastTitle>Your registration has succeeded</ToastTitle>
              <ToastDescription>
                We look forward to seeing you at the event.
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
    setCounter(counter + 1);
  };

  const leaveEvent = async () => {
    await supabase
      .from("events_users")
      .delete()
      .eq("eventId", eventData?.id)
      .eq("user", userId);
    setJoinedEvent(false);

    toast.show({
      placement: "top",
      render: ({ id }) => {
        const toastId = "toast-" + id;
        return (
          <Toast nativeID={toastId} action="info" variant="accent">
            <VStack space="xs">
              <ToastTitle>Info</ToastTitle>
              <ToastDescription>
                We're sorry to see that you've left. Hope to see you at another
                event soon!"
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
    setCounter(counter + 1);
  };

  if (loading)
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
  return (
    <SafeAreaView className="">
      <View className="">
        <View className="flex flex-row justify-between p-4  items-center ">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-tblack-900 p-2 rounded-tr-2xl rounded-bl-2xl ml-5 mt-2 w-9"
          >
            <ArrowLeftIcon size="20" color="white" />
          </TouchableOpacity>
          <HStack
            space="md"
            marginRight="$5"
            h="100%"
            justifyContent="center"
            alignItems="center"
          >
            <AvatarIcon />
          </HStack>

          {/* <AvatarIcon /> */}
        </View>
        <View className="p-6">
          <View className="items-center">
            {imageLoading && (
              <ActivityIndicator
                style={{ position: "absolute", top: "50%" }}
                size="large"
                color="#0000ff"
              />
            )}
            <Image
              shadow={2}
              onLoad={() => setImageLoading(false)}
              source={{ uri: eventData?.eventImage }}
              //source={require("../assets/ann.jpeg")}
              alt=""
              className="w-[360px] h-[270px] rounded-xl "
            />
          </View>
          <View className="flex  items-start mt-6 pl-4">
            <Text className="font-bold text-3xl">{eventData?.eventName}</Text>
            <Text className="my-4">{eventData?.eventName}</Text>
            <Text className="text-xl font-semibold">About</Text>
            <Text className="mt-2">{eventData?.eventAbout}</Text>
          </View>
        </View>
        <View className="p-8 pt-0">
          <View className="flex justify-center items-center mb-2">
            <Text className="mb-3 font-light mt-4">Timeline Event</Text>
            <View className="flex flex-row justify-between items-center px-8 h-10 w-80 bg-gray-400 rounded-2xl">
              <Text>Starting at</Text>
              <Text>{eventData?.date}</Text>
            </View>
          </View>
          <Box>
            {joinedEvent ? (
              <Button
                variant="link"
                action="negative"
                onPress={leaveEvent}
                py="$2"
                px="$4"
              >
                <ButtonText size="sm">Leave</ButtonText>
              </Button>
            ) : (
              <Button
                onPress={attendEvent}
                variant="solid"
                mt="$2"
                h="$12"
                rounded="$2xl"
              >
                {!attendingEvent ? (
                  <>
                    <ButtonText>Join the Event</ButtonText>
                    <ButtonIcon
                      as={ArrowRightIcon}
                      ml="$4"
                      fontSize="$2xl"
                      fontWeight="$bold"
                    />
                  </>
                ) : (
                  <ActivityIndicator size="small" />
                )}
              </Button>
            )}
          </Box>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EventScreen;
