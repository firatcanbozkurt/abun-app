import { supabase } from "../supabase";
import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
export default function Logout() {
  supabase.auth.signOut();
  const navigation = useNavigation();
  navigation.replace("Login");
  return <View></View>;
}
