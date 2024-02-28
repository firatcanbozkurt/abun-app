import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/context/AuthContext";
const TransitionScreen = ({ navigation }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      setAuth(isLoggedIn);
    };
    checkAuth();
  }, []);
  if (!auth) {
    return (
      <View>
        <Text>Ankara Science University</Text>
      </View>
    );
  } else {
    navigation.replace("Home");
  }
  console.log(auth);
};

export default TransitionScreen;
