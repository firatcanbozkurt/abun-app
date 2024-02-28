import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider, Text, Box, Button } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { useAuth } from "./components/context/AuthProvider.tsx";
import AuthProvider from "./components/context/AuthProvider.tsx";
import AuthNavigator from "./navigatiors/AuthNavigator";

function App() {
  const { session } = useAuth();
  console.log(session);

  return (
    <AuthProvider>
      <GluestackUIProvider config={config}>
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <AuthNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </GluestackUIProvider>
    </AuthProvider>
  );
}
export default App;
