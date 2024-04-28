import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import NotificationProvider from "./components/context/NotificationProvider";
import AuthProvider from "./components/context/AuthProvider.tsx";
import AuthNavigator from "./navigatiors/AuthNavigator";
import QueryProvider from "./components/context/QueryProvider";

function App() {
  return (
    <AuthProvider>
      <QueryProvider>
        <NotificationProvider>
          <GluestackUIProvider config={config}>
            <SafeAreaProvider>
              <NavigationContainer>
                <AuthNavigator />
              </NavigationContainer>
            </SafeAreaProvider>
          </GluestackUIProvider>
        </NotificationProvider>
      </QueryProvider>
    </AuthProvider>
  );
}
export default App;
