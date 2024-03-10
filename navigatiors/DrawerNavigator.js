import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import PastExamScreen from "../screens/PastExamScreen";
import EventScreen from "../screens/EventScreen";
import { supabase } from "../supabase";

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
      <DrawerItem
        label="Logout"
        onPress={() => {
          supabase.auth.signOut();
        }}
      />
      <DrawerItem
        label="Event"
        onPress={() => {
          navigation.navigate("Event");
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
      initialRouteName=""
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="TabNavigator" component={TabNavigator} />
      <Drawer.Screen name="PastExams" component={PastExamScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
