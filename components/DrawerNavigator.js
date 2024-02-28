import React from "react";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { Drawer } from "expo-router/drawer";

const DrawerNavigator = () => {
  return (
    <Drawer>
      <Drawer.Screen options={{ title: "Welcome", drawerLabel: "Welcome" }} />
      <Drawer.Screen
        options={{ title: "CreateProfile", drawerLabel: "CreateProfile" }}
      />
      <Drawer.Screen options={{ title: "Home", drawerLabel: "Home" }} />
      <Drawer.Screen options={{ title: "Profile", drawerLabel: "Profile" }} />
    </Drawer>
  );
};

export default DrawerNavigator;
