import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Button = ({ title, style, onPress }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed ? "darkblue" : "blue", // Basıldığında rengi değiştirme
        },
        style,
      ]}
      onPress={() => {
        console.log("Button Pressed");
        onPress();
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 28,
    width: "80%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    lineHeight: 55,
  },
});

export default Button;
