import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { useFonts } from "expo-font";
import AvatarIcon from "../components/AvatarIcon";
import { useAuth } from "../components/context/AuthProvider";
const ProfileScreen = () => {
  const { profile } = useAuth();
  const navigation = useNavigation();
  console.log(profile);

  const [fontsLoaded, fontError] = useFonts({
    Montserrat: require("../assets/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: 120 }}>
        <AvatarIcon sz="xl" navigation={navigation} />
      </View>
      <Text style={{ fontWeight: "bold", fontSize: 24 }}>
        {profile.full_name}
      </Text>
      <Text style={{ fontSize: 16 }}>{profile.uuid}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});

export default ProfileScreen;
