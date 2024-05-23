import { View, Text, Pressable, Image, TouchableOpacity,FlatList,  StyleSheet} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { format, getDay } from "date-fns";
import { Octicons } from "@expo/vector-icons";
import { supabase } from "../supabase";
import { useNavigation } from "@react-navigation/native";

import {
  Avatar, ScrollView,
} from "@gluestack-ui/themed";
import AvatarIcon from "../components/AvatarIcon";
const HomeScreen = ({ navigation }) => {

  const [eventData, setEventData] = useState([])
  const today = new Date();
  const formattedDate = format(today, "MMMM d, yyyy");
  const dayOfWeek = getDay(today);
  const navigation2 = useNavigation();
  const [loading, setLoading] = useState(true);

  const logout = () => {
    supabase.auth.signOut();
    navigation.replace("Login");
    console.log("logged out");
  };
  const openDrawer = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const { data, error } = await supabase.from("eventTest").select("*");

        if (error) {
          console.error("Error fetching all events:", error.message);
          return;
        }

        const imageUrls = [];
        const eventIds = [];

        const imageUrlPromises = data.map(async (event) => {
          const { data: imageData, error: imageError } = await supabase.storage
            .from("event_images")
            .getPublicUrl(event.eventImage);
          if (imageError) {
            console.error("Error fetching image:", imageError.message);
            return null;
          }
          imageUrls.push(imageData.publicUrl); 
          eventIds.push(event.id);
        });

        await Promise.all(imageUrlPromises);

        const eventsWithImages = data.map((event) => ({
          ...event,
          eventImage: imageUrls[eventIds.indexOf(event.id)],
        }));

        const sortedEvents = eventsWithImages.sort((a, b) => new Date(a.date) - new Date(b.date));
        const upcomingEvents = sortedEvents.slice(0, 2);


        setEventData(
         upcomingEvents
        );

      } catch (error) {
        console.error("Error fetching all events:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []); 
  const handleEventPress = (selectedEvent) => {
    console.log("Selected Event ID:", selectedEvent.id);
    navigation2.navigate("Event", { eventData: selectedEvent });
  };
  const renderCard = ({ item }) => (
    <TouchableOpacity onPress={() => handleEventPress(item)}>
      <View style={styles.card}>
        <Image source={{ uri: item.eventImage }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <Text style={styles.eventName}>{item.eventName}</Text>
          <Text style={styles.eventAbout}>{item.eventAbout}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 ">
      <View className="flex-1 p-4">
        <View className="flex flex-row justify-between px-4 items-center">
          <TouchableOpacity
            onPress={openDrawer}
            android_ripple={{ color: "transparent" }}
          >
            <Octicons name="three-bars" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Avatar
              bg="green.500"
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            ></Avatar>
          </TouchableOpacity>
          <AvatarIcon navigation={navigation} />
        </View>
        <View className="flex-1 px-4">
          <View>
            <Text className="text-xl my-4">Today's {formattedDate}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-lg mt-2">Hello {}</Text>
            <Text className="text-xl font-semibold">Announcements</Text>
            <Image
              shadow={2}
              source={require("../assets/ann.jpeg")}
              alt="Alternate Text"
              className="w-full h-2/5 mt-4 rounded"
            />
            <View className="flex flex-row justify-between items-center">
              <Text className="text-xl font-semibold my-4">
                Upcoming Events
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("AllEvents")}
              >
                <Text className="mr-1 text-secondary">See All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.eventsContainer}>
              {eventData.map((event, index) => (
                <TouchableOpacity key={index} onPress={() => handleEventPress(event)}>
                  <View style={styles.card}>
                    <Image source={{ uri: event.eventImage }} style={styles.cardImage} />
                    <View style={styles.cardContent}>
                      <Text style={styles.eventName}>{event.eventName}</Text>
                      <Text style={styles.eventAbout}>{event.eventAbout}</Text>
                      <Text style={styles.date}>{event.date}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#f0f0f0",
  },
  eventsContainer:{
    padding: 4,
  },
  flatListContainer: {
    padding: 12,
    paddingTop: 8,
  },
  card: {
    display:"flex",
    flexDirection:"row",
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3, 
  },
  cardImage: {
    width: "50%",
    height: "100%",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  cardContent: {
    padding: 16,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  eventAbout: {
    fontSize: 16,
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
});

export default HomeScreen;
