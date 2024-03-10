import {
  HStack,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@gluestack-ui/themed";
import { Pressable, View } from "react-native";

const AvatarIcon = ({ navigation }) => {
  return (
    <HStack space="md" h="100%" justifyContent="center" alignItems="center">
      <Pressable onPress={() => navigation.navigate("Profile")}>
        <View className="">
          <Avatar size="md" bgColor="$purple600">
            <AvatarFallbackText>Halid Acar</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: "https://wrong-url",
              }}
              alt=""
              onPress={() => navigation.navigate("Profile")}
            />
          </Avatar>
        </View>
      </Pressable>
    </HStack>
  );
};

export default AvatarIcon;
