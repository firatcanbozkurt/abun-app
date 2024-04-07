import { View, Text, Pressable, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { format, getDay } from "date-fns";
import { Octicons } from "@expo/vector-icons";
import { supabase } from "../supabase";
import {
  HStack,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Button,
  ButtonText,
  ButtonIcon,
  Icon,
  Box,
} from "@gluestack-ui/themed";
import AvatarIcon from "../components/AvatarIcon";
const HomeScreen = ({ navigation }) => {
  const today = new Date();
  const formattedDate = format(today, "MMMM d, yyyy");
  const dayOfWeek = getDay(today);
  const logout = () => {
    supabase.auth.signOut();
    navigation.replace("Login");
    console.log("logged out");
  };
  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <SafeAreaView className="flex-1 ">
      <View className="flex-1 p-4">
        <View className="flex flex-row justify-between px-4 items-center">
          <TouchableOpacity
            onPress={openDrawer}
            android_ripple={{ color: "transparent" }}
          >
            <Octicons name="three-bars" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Avatar
              bg="green.500"
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            ></Avatar>
          </TouchableOpacity>
          <AvatarIcon navigation={navigation} />
        </View>
        <View className="flex-1 px-4">
          <View>
            <Text className="text-xl my-4">Today's {formattedDate}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-lg mt-2">Hello {}</Text>
            <Text className="text-xl font-semibold">Announcements</Text>
            <Image
              shadow={2}
              source={require("../assets/ann.jpeg")}
              alt="Alternate Text"
              className="w-full h-2/5 mt-4 rounded"
            />
            <View className="flex flex-row justify-between items-center">
              <Text className="text-xl font-semibold my-4">
                Upcoming Events
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("AllEvents")}
              >
                <Text className="mr-1 text-secondary">See All</Text>
              </TouchableOpacity>
            </View>
            <View className="flex flex-row">
              <Image
                shadow={2}
                source={require("../assets/ann.jpeg")}
                alt="alt"
                className="w-[120px] h-[100px] rounded"
              />
              <View className="items-start p-1 pl-4">
                <Text className="text-xl">Museum Week Fest</Text>
                <Text className="text-sm font-light my-1">By "" club</Text>
                <Text className="text-sm font-light ">May 21 09:00 - On</Text>
              </View>
            </View>
            <View className="flex flex-row my-5">
              <Image
                shadow={2}
                source={require("../assets/ann.jpeg")}
                alt="alt"
                className="w-[120px] h-[100px] rounded"
              />
              <View className="items-start p-1 pl-4">
                <Text className="text-xl ">Museum Week Fest</Text>
                <Text className="text-sm font-light my-1">By "" club</Text>
                <Text className="text-sm font-light ">May 21 09:00 - On</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
