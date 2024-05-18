import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import TabNavigator from "./TabNavigator";
import DrawerNavigator from "./DrawerNavigator";
import PastExamScreen from "../screens/PastExamScreen";
import SendNotification from "../screens/SendNotification";
import EventScreen from "../screens/EventScreen";
import CreateEventScreen from "../screens/CreateEventScreen";
import AllEventsScreen from "../screens/AllEventsScreen";
import { useAuth } from "../components/context/AuthProvider";
import VocabularyItemsScreen from "../screens/VocabularyItemsScreen";
import loadingAnimation from "../assets/loading.json";
import LottieView from "lottie-react-native";
import BlogScreen from "../screens/BlogScreen";
import BlogModal from "../components/blog/BlogModal";
const Stack = createNativeStackNavigator();
import { SafeAreaView, View } from "react-native";

function AuthNavigator() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <View className="flex justify-center items-center">
          <LottieView
            source={loadingAnimation}
            style={{ height: 100, aspectRatio: 1 }}
            autoPlay
            loop
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      {!session ? (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="CreateProfile" component={CreateProfileScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="PastExams" component={PastExamScreen} />
          <Stack.Screen name="Event" component={EventScreen} />
          <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
          <Stack.Screen name="notification" component={SendNotification} />
          <Stack.Screen name="AllEvents" component={AllEventsScreen} />
          <Stack.Screen
            name="VocabularyItems"
            component={VocabularyItemsScreen}
          />
          <Stack.Screen name="BlogScreen" component={BlogScreen} />
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="BlogModal" component={BlogModal} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
}

export default AuthNavigator;
