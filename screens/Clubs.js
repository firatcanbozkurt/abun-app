import { View, Text, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import confetti from "../assets/confetti.png";
import Cards from "../components/Cards";
import { Avatar } from "@gluestack-ui/themed";
import { ScrollView } from "@gluestack-ui/themed";
const Clubs = ({ navigation }) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="p-4">
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
            >
              <Text>ICON</Text>
            </Avatar>
          </Pressable>
        </View>
        <View className="p-4">
          <View className="flex-row justify-center items-center">
            <Text className="text-2xl mt-4 mr-1">Discover Communities </Text>
            <Image source={confetti} className="w-8 h-8" />
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className=" items-center">
          <Cards />
          <Cards />
          <Cards />
          <Cards />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Clubs;
