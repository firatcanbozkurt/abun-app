import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import React, { useContext, useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from "../components/context/AuthContext";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const { isLoggedIn } = useContext(AuthContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isLoggedIn) {
      navigation.replace("Home");
    }
  }, []);
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000, // 1 saniyede tamamen görünür olacak
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView className="flex-1 bg-primary ">
      <View className="flex-1 flex justify-around mt-10">
        <Text className="text-twhite font-bold text-4xl text-center">
          Let's Get Started!
        </Text>
      </View>
      <View className="flex-row justify-center mb-20">
        <Image
          source={require("../assets/welcomeP.png")}
          style={{ width: 350, height: 350 }}
        />
      </View>
      <View className="space-y-4 ">
        <TouchableOpacity
          className="py-3 bg-twhite mx-4 rounded-xl"
          onPress={() => navigation.navigate("Register")}
        >
          <Text className="text-xl font-bold text-center">Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-center mb-20 mt-5">
        <Text className="text-twhite ">Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text className="font-bold text-secondary ml-2">Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
