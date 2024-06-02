import {
  HStack,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@gluestack-ui/themed";
import { Pressable, View } from "react-native";
import { useAuth } from "./context/AuthProvider";
import { useNavigation } from "@react-navigation/native";

const AvatarIcon = ({ navigation }) => {
  const navigation2 = useNavigation()
  const { profile } = useAuth();
  const profileName = profile?.full_name;
  return (
    <HStack space="md" h="75%">
      <Pressable onPress={() => navigation2.navigate("Profile")}>
        <View >
          <Avatar size="md" bgColor="$dimgray">
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
