import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import Clubs from "../screens/Clubs";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 100 },
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "#2B47FC",
        tabBarItemStyle: { marginBottom: 5 },
        tabBarIconStyle: { marginTop: 15 },
        tabBarLabelStyle: { fontSize: 14 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Entypo
              name="home"
              size={24}
              color={focused ? "#2B47FC" : "gray"}
            />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={focused ? "#2B47FC" : "gray"}
            />
          ),
          tabBarLabel: "Profile",
        }}
      />
      <Tab.Screen
        name="Clubs"
        component={Clubs}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Foundation
              name="social-skillshare"
              size={24}
              color={focused ? "#2B47FC" : "gray"}
            />
          ),
          tabBarLabel: "Clubs",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
