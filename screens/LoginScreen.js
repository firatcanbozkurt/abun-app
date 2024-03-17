import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../supabase.js";

//
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);

  const [error, setError] = useState(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const checkEmailValidity = (input) => {
    const isValid = input.toLowerCase().endsWith("@ankarabilim.edu.tr");
    return isValid;
  };
  const handleEmailChange = (text) => {
    const isValid = checkEmailValidity(text);
    setIsValidEmail(isValid);
    setEmail(text);
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    //if (error) Alert.alert(error.message);

    if (error) {
      Alert.alert(error.message);
    } else {
      if (user && !user.email_verified) {
        Alert.alert(
          "Email verification required",
          "Please verify your email address."
        );
      } else {
        Alert.alert("Login Successful", "You are logged in successfully.");
        navigation.replace("Home");
      }
    }
  };

  useEffect(() => {
    checkEmailValidity(email);
  }, [email]);

  return (
    <View className="flex-1 bg-primary ">
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-secondary p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-4"
          >
            <ArrowLeftIcon size="20" color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mb-4">
          <Image
            source={require("../assets/welcomeP.png")}
            style={{ width: 280, height: 280 }}
          />
        </View>
      </SafeAreaView>
      <View
        className="flex-1 bg-twhite px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <View className="flex">
            <TextInput
              className="p-4 bg-gray-200 text-gray-900 rounded-2xl mb-3"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              placeholder="@ankarabilim.edu.tr"
              placeholderTextColor={"#718096"}
            />
            {checkEmailValidity(email) && (
              <Feather
                name="check"
                size={24}
                color="#CB3EF9"
                style={{
                  position: "absolute",
                  alignSelf: "flex-end",
                  right: 10,
                  top: "25%",
                }}
              />
            )}
          </View>
          <Text className="text-gray-700 ml-4">Password</Text>
          <View>
            <TextInput
              className="p-4 bg-gray-200 text-gray-900 rounded-2xl"
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Enter Password"
              secureTextEntry={!passwordVisible}
            />
            <Pressable
              onPress={togglePasswordVisibility}
              style={{
                position: "absolute",
                alignSelf: "flex-end",
                justifyContent: "center",
                top: "25%",
                right: 10,
              }}
            >
              <Ionicons
                name={passwordVisible ? "eye" : "eye-off"}
                size={24}
                color="#2343FD"
              />
            </Pressable>
          </View>
          <TouchableOpacity className="flex items-end mb-5">
            <View className="flex-row  items-center">
              {error && (
                <Text
                  style={{
                    color: "red",
                    textAlign: "center",
                    marginRight: 30,
                  }}
                >
                  {error}
                </Text>
              )}
              <Text className="text-gray-700 ">Forgot Password?</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            variant="success"
            onPress={handleLogin}
            disabled={!isValidEmail}
            style={{ backgroundColor: isValidEmail ? "#B52FF8" : "#ccc" }}
            className="py-3  rounded-2xl "
          >
            <Text className="font-xl font-bold text-center text-twhite ">
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold mr-1">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text className="font-semibold text-primary">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
