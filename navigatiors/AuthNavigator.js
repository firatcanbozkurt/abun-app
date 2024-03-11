import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import TabNavigator from "./TabNavigator";
import DrawerNavigator from "./DrawerNavigator";
import PastExamScreen from "../screens/PastExamScreen";
import EventScreen from "../screens/EventScreen";
import CreateEventScreen from "../screens/CreateEventScreen";
import AllEventsScreen from "../screens/AllEventsScreen";
import { useAuth } from "../components/context/AuthProvider";
const Stack = createNativeStackNavigator();

function AuthNavigator() {
  const { session } = useAuth();
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
          <Stack.Screen name="AllEvents" component={AllEventsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default AuthNavigator;
