import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import TabNavigator from "./TabNavigator";
import PastExamScreen from "../screens/PastExamScreen";
import { supabase } from "../supabase";
import { View, SafeAreaView, StyleSheet, Text } from "react-native";
import VocabularyItemsScreen from "../screens/VocabularyItemsScreen";
import { useAuth } from "../components/context/AuthProvider";
import ClubDetailsScreen from "../screens/ClubDetailsScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import AvatarIcon from "../components/AvatarIcon";

const CustomDrawerContent = ({ navigation }) => {
  const navigation2 = useNavigation();
  const { isAdmin, profile } = useAuth();
  console.log(profile.full_name);
  return (
    <DrawerContentScrollView>
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "",
            alignItems: "center",
          }}
        >
          <View style={styles.avatarContainer}>
            <AvatarIcon />
          </View>
          <View style={{marginTop:20 , marginLeft:20, }}>
            <Text style={styles.profileText}>{profile.full_name}</Text>
            </View>
        </View>
        <DrawerItem
          label=""
          onPress={() => {
            navigation.navigate("Profile");
          }}
          contentContainerStyle={styles.drawerItem}
          labelStyle={styles.drawerLabel}
        />
        <DrawerItem
          label="Home"
          onPress={() => {
            navigation.navigate("Home");
          }}
          icon={({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          )}
          contentContainerStyle={styles.drawerItem}
          labelStyle={styles.drawerLabel}
        />
        <DrawerItem
          label="Profile"
          onPress={() => {
            navigation.navigate("Profile");
          }}
          icon={({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          )}
          contentContainerStyle={styles.drawerItem}
          labelStyle={styles.drawerLabel}
        />
        <DrawerItem
          label="Clubs"
          onPress={() => {
            navigation.navigate("Clubs");
          }}
          icon={({ color, size }) => (
            <Icon name="group" color={color} size={size} />
          )}
          contentContainerStyle={styles.drawerItem}
          labelStyle={styles.drawerLabel}
        />
        <DrawerItem
          label="Past Exams"
          onPress={() => {
            navigation.navigate("PastExams");
          }}
          icon={({ color, size }) => (
            <Icon name="history" color={color} size={size} />
          )}
          contentContainerStyle={styles.drawerItem}
          labelStyle={styles.drawerLabel}
        />
        {isAdmin && (
          <>
            <DrawerItem
              label="Create Event"
              onPress={() => {
                navigation.navigate("CreateEvent");
              }}
              icon={({ color, size }) => (
                <Icon name="event" color={color} size={size} />
              )}
              contentContainerStyle={styles.drawerItem}
              labelStyle={styles.drawerLabel}
            />
            <DrawerItem
              label="Send notification"
              onPress={() => {
                navigation.navigate("notification");
              }}
              icon={({ color, size }) => (
                <Icon name="notifications" color={color} size={size} />
              )}
              contentContainerStyle={styles.drawerItem}
              labelStyle={styles.drawerLabel}
            />
            <DrawerItem
              label="Announcements"
              onPress={() => {
                navigation.navigate("announcements");
              }}
              icon={({ color, size }) => (
                <Icon name="announcement" color={color} size={size} />
              )}
              contentContainerStyle={styles.drawerItem}
              labelStyle={styles.drawerLabel}
            />
          </>
        )}
        <DrawerItem
          label="Events"
          onPress={() => {
            navigation.navigate("AllEvents");
          }}
          icon={({ color, size }) => (
            <Icon name="event-note" color={color} size={size} />
          )}
          contentContainerStyle={styles.drawerItem}
          labelStyle={styles.drawerLabel}
        />
        <DrawerItem
          label="Saved Vocabulary"
          onPress={() => {
            navigation.navigate("VocabularyList");
          }}
          icon={({ color, size }) => (
            <Icon name="bookmarks" color={color} size={size} />
          )}
          contentContainerStyle={styles.drawerItem}
          labelStyle={styles.drawerLabel}
        />
        <DrawerItem
          label="Vocabulary Items"
          onPress={() => {
            navigation.navigate("VocabularyCourse");
          }}
          icon={({ color, size }) => (
            <Icon name="library-books" color={color} size={size} />
          )}
          contentContainerStyle={styles.drawerItem}
          labelStyle={styles.drawerLabel}
        />
        <DrawerItem
          label="Logout"
          onPress={() => {
            supabase.auth.signOut();
          }}
          labelStyle={{ color: "blue", marginLeft: -16 }}
          icon={({ color, size }) => (
            <Icon name="logout" color="blue" size={size} />
          )}
          contentContainerStyle={styles.drawerItem}
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
      initialRouteName="TabNavigator"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="TabNavigator" component={TabNavigator} />
      <Drawer.Screen name="PastExams" component={PastExamScreen} />
      <Drawer.Screen name="VocabularyItems" component={VocabularyItemsScreen} />
      <Drawer.Screen
        name="ClubDetailsScreen.js"
        component={ClubDetailsScreen}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    height: "5%",
    left: "15%",
  },
  profileText: {
    marginTop:25,
    fontSize: 20,
    fontWeight:"500",
    color: "black",
  },
  drawerContainer: {
    flex: 1,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 0,
  },
  drawerLabel: {
    marginLeft: -16,
  },
});

export default DrawerNavigator;
