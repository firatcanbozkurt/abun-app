import {
  HStack,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@gluestack-ui/themed";
import { Pressable, View } from "react-native";
import { useAuth } from "./context/AuthProvider";

const AvatarIcon = ({ navigation }) => {
  const { profile } = useAuth();
  const profileName = profile?.full_name;
  return (
    <HStack space="md" h="100%">
      <Pressable onPress={() => navigation.navigate("Profile")}>
        <View className="">
          <Avatar size="md" bgColor="$purple600">
            <AvatarFallbackText>{profileName}</AvatarFallbackText>
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
