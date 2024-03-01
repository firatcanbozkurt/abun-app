import React from "react";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import Clubs from "../screens/Clubs";
import TabNavigator from "./TabNavigator";
import PastExamScreen from "../screens/PastExamScreen";

const CustomDrawerContent = ({ navigation }) => {
  return (
    <DrawerContentScrollView>
      <DrawerItem
        label="Home"
        onPress={() => {
          navigation.navigate("Home");
        }}
      />

      <DrawerItem
        label="Profile"
        onPress={() => {
          navigation.navigate("Profile");
        }}
      />
      <DrawerItem
        label="Clubs"
        onPress={() => {
          navigation.navigate("Clubs");
        }}
      />
      <DrawerItem
        label="Past Exams"
        onPress={() => {
          navigation.navigate("PastExams");
        }}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Tabs" component={TabNavigator} />
      <Drawer.Screen name="PastExams" component={PastExamScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
