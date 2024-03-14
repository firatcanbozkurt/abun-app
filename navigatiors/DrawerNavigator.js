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
import { View, ScrollView, StyleSheet } from "react-native";
import { useAuth } from "../components/context/AuthProvider";

const CustomDrawerContent = ({ navigation }) => {
  const { isAdmin } = useAuth();
  return (
    <DrawerContentScrollView>
      <View>
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
          label="Event"
          onPress={() => {
            navigation.navigate("Event");
          }}
        />
        {isAdmin && ( // if user is admin show the create event screen on the sidebar
          <DrawerItem
            label="Create Event"
            onPress={() => {
              navigation.navigate("CreateEvent");
            }}
          />
        )}
        <DrawerItem
          label="Events"
          onPress={() => {
            navigation.navigate("AllEvents");
          }}
        />
        <DrawerItem
          label="Logout"
          onPress={() => {
            supabase.auth.signOut();
          }}
          labelStyle={{ color: "blue" }}
          style={{
            borderTopWidth: 1,
            borderTopColor: "gray",
          }}
        />
      </View>
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
