import HomeScreen from "./screens/HomeScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import Clubs from "./screens/Clubs";
import CreateProfileScreen from "./screens/CreateProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState, createContext } from "react";
import { AuthContext } from "./components/context/AuthContext";
import { GluestackUIProvider, Text, Box, Button } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"; // Optional if you want to use default theme
import { useAuth } from "./components/context/AuthProvider.tsx";
import AuthProvider from "./components/context/AuthProvider.tsx";
import Logout from "./screens/Logout";
import { supabase } from "./supabase";
const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

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
    </DrawerContentScrollView>
  );
};
const AppNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Clubs" component={Clubs} />
    </Drawer.Navigator>
  );
};

function App() {
  const { session } = useAuth();
  console.log(session);

  return (
    <AuthProvider>
      <GluestackUIProvider config={config}>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            {session ? <AppNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        </SafeAreaProvider>
      </GluestackUIProvider>
    </AuthProvider>
  );
}
export default App;
