import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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

import { ArrowRightIcon, ArrowLeftIcon } from "react-native-heroicons/solid";
import TabNavigator from "../navigatiors/TabNavigator";
import AvatarIcon from "../components/AvatarIcon";

const EventScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="">
      <View className="">
        <View className="flex flex-row justify-between p-4  items-center ">
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className="bg-secondary p-2 rounded-tr-2xl rounded-bl-2xl ml-5 mt-4 w-9"
          >
            <ArrowLeftIcon size="20" color="white" />
          </TouchableOpacity>
          <HStack
            space="md"
            h="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Pressable onPress={() => navigation.navigate("Profile")}>
              <View className="pr-5">
                <Avatar size="md">
                  <AvatarFallbackText>Halid Acar</AvatarFallbackText>
                  <AvatarImage
                    source={{
                      uri: "https://wrong-url",
                    }}
                    onPress={() => navigation.navigate("Profile")}
                  />
                </Avatar>
              </View>
            </Pressable>
          </HStack>

          {/* <AvatarIcon /> */}
        </View>
        <View className="p-6">
          <View className="items-center">
            <Image
              shadow={2}
              source={require("../assets/ann.jpeg")}
              alt=""
              className="w-[360px] h-[270px] rounded-xl "
            />
          </View>
          <View className="flex  items-start mt-6 pl-4">
            <Text className="font-bold text-3xl">Event Name</Text>
            <Text className="my-4">By ... club</Text>
            <Text className="text-xl font-semibold">About</Text>
            <Text className="mt-2">
              The Social Responsibility Club is a dedicated community of
              individuals who are passionate about making a positive impact on
              society. Our mission is to promote and engage in various
              initiatives that address pressing social and environmental
              issues,fostering a sense of responsibility and compassion within
              our members.
            </Text>
          </View>
        </View>
        <View className="p-8 pt-0">
          <View className="flex justify-center items-center mb-2">
            <Text className="mb-3 font-light mt-4">Timeline Event</Text>
            <View className="flex flex-row justify-between items-center px-8 h-10 w-80 bg-gray-400 rounded-2xl">
              <Text>Starting at</Text>
              <Text>May 21, 09.00 PM</Text>
            </View>
          </View>
          <Box>
            <Button variant="solid" mt="$2" h="$12" rounded="$2xl">
              <ButtonText>Join the Event</ButtonText>
              <ButtonIcon
                as={ArrowRightIcon}
                ml="$4"
                fontSize="$2xl"
                fontWeight="$bold"
              />
            </Button>
          </Box>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EventScreen;
