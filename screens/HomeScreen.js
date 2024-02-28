import { View, Text, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { format, getDay } from "date-fns";
import { Octicons } from "@expo/vector-icons";
import { supabase } from "../supabase";
import { Avatar } from "@gluestack-ui/themed";
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
          <Pressable
            onPress={openDrawer}
            android_ripple={{ color: "transparent" }}
          >
            <Octicons name="three-bars" size={24} color="black" />
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Profile")}>
            <Avatar
              bg="green.500"
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            ></Avatar>
          </Pressable>
          <Pressable onPress={logout}>
            <Text>Logout</Text>
          </Pressable>
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
              className="w-full h-2/4 mt-4 rounded"
            />
            <Text className="text-xl font-semibold my-4">Upcoming Events</Text>
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

// <View className="flex-1 justify-center items-center">
// <Pressable onPress={() => navigation.navigate("CreateProfile")}>
//   <Text>createprofile</Text>
// </Pressable>
// <Pressable onPress={() => navigation.navigate("Login")}>
//   <Text className="text-3xl">Login Page</Text>
//   <Pressable onPress={() => navigation.navigate("Register")}>
//     <Text className="text-3xl mt-5">Register page</Text>
//   </Pressable>
// </Pressable>
// <Pressable onPress={() => navigation.navigate("Welcome")}>
//   <Text className="text-3xl my-5">Welcome page</Text>
// </Pressable>
// <Pressable onPress={() => navigation.navigate("Profile")}>
//   <Text className="text-3xl">Profile Page</Text>
// </Pressable>
// </View> */}
