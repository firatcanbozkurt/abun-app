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
import { AuthContext } from "../components/context/AuthContext.js";
import { supabase } from "../supabase.js";

export default function RegisterScreen({ navigation }) {
  const { isLoggedIn } = useContext(AuthContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // while sign up disable the button
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [error, setError] = useState(null);

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    else {
      navigation.replace("Login");
      setLoading(false);
    }
  }

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
  useEffect(() => {
    if (isLoggedIn) {
      navigation.replace("Home");
    }
  }, []);

  return (
    <View className="flex-1 bg-primary ">
      <SafeAreaView className="flex">
        {/* Back button */}
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-secondary p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-4"
          >
            <ArrowLeftIcon size="20" color="white" />
          </TouchableOpacity>
        </View>
        {/* Image */}
        <View className="flex-row justify-center mb-4">
          <Image
            source={require("../assets/welcomeP.png")}
            style={{ width: 210, height: 210 }}
          />
        </View>
      </SafeAreaView>
      {/* Input white area */}
      <View
        className="flex-1 bg-twhite px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Full Name</Text>
          <TextInput
            className="p-4 bg-gray-200 text-gray-900 rounded-2xl mb-3 "
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            placeholder="Enter Full name"
            placeholderTextColor={"#718096"}
          />
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <View className="flex">
            <TextInput
              className="p-4 bg-gray-200 text-gray-900 rounded-2xl mb-3 "
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
          <View className="mb-8">
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

          <TouchableOpacity
            variant="success"
            onPress={signUpWithEmail}
            disabled={!isValidEmail}
            style={{ backgroundColor: isValidEmail ? "#B52FF8" : "#ccc" }}
            className="py-3  rounded-2xl "
          >
            <Text className="font-xl font-bold text-center text-twhite ">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold mr-1">
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text className="font-semibold text-secondary">Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
