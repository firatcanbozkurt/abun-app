import {
  View,
  Text,
  Pressable,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { format, getDay, set } from "date-fns";
import { Octicons } from "@expo/vector-icons";
import { supabase } from "../supabase";
import { useNavigation } from "@react-navigation/native";

import {
  HStack,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Button,
  ButtonText,
  ButtonIcon,
  Icon,
  Box,
  ScrollView,
} from "@gluestack-ui/themed";
import AvatarIcon from "../components/AvatarIcon";
import { useAuth } from "../components/context/AuthProvider";

const HomeScreen = ({ navigation }) => {
  const [eventData, setEventData] = useState([]);
  const today = new Date();
  const formattedDate = format(today, "MMMM d, yyyy");
  const dayOfWeek = getDay(today);
  const navigation2 = useNavigation();
  const [loading, setLoading] = useState(true);
  const [announcementsLoading, setAnnouncementsLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const { profile } = useAuth();

  const openDrawer = () => {
    navigation.openDrawer();
  };

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const { data, error } = await supabase
          .from("announcements")
          .select("id, src_image");

        if (error) {
          console.error("Error fetching all events:", error.message);
          return;
        }

        const announcementData = [];

        const imageUrlPromises = data.map(async (announcement) => {
          const { data: imageData, error: imageError } = await supabase.storage
            .from("announcements")
            .getPublicUrl(announcement.src_image);
          if (imageError) {
            console.error("Error fetching image:", imageError.message);
            return null;
          }
          console.log("IMAGE", imageData.publicUrl);
          announcementData.push({
            uri: imageData.publicUrl,
            id: announcement.id,
          });
        });

        await Promise.all(imageUrlPromises);
        setAnnouncements(announcementData);
        setAnnouncementsLoading(false);
      } catch (error) {
        console.error("Error fetching all events:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncements();
  }, []);

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
        console.log(profile);

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

        const sortedEvents = eventsWithImages.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        const upcomingEvents = sortedEvents.slice(0, 2);

        setEventData(upcomingEvents);
      } catch (error) {
        console.error("Error fetching all events:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []);
  const handleEventPress = (selectedEvent) => {
    navigation2.navigate("Event", { eventData: selectedEvent });
  };

  // Varsayılan görsel için URL veya yerel yol
  const defaultImageUri = "https://via.placeholder.com/"; // Bu örnek bir URL'dir, kendi görselinizi kullanabilirsiniz.

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
          <View className="">
            <Text className="text-xl my-4">Today's {formattedDate}</Text>
          </View>
          <View className="flex-1">
            <View className="flex-1">
              <Text className="text-lg mt-2">Hello {profile.full_name}</Text>
              <Text className="text-xl font-semibold">Announcements</Text>
              {announcementsLoading ? (
                <View
                  style={{
                    width: 300,
                    height: 200,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <ActivityIndicator size="large" color="#0000ff" />
                </View>
              ) : announcements.length === 0 ? ( // Veri yoksa
                <View
                  style={{
                    width: 300,
                    height: 200,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: defaultImageUri }}
                    style={{
                      width: 300,
                      marginTop:"5%",
                      height: 200,
                      resizeMode: "cover",
                      borderRadius: 10,
                    }}
                  />
                </View>
              ) : (
                <FlatList
                  horizontal
                  data={announcements}
                  keyExtractor={(item) => item.id}
                  style={{marginTop:"5%"}}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("announcement", {
                          id: item.id,
                          uri: item.uri,
                          url: item.url,
                        })
                      }
                    >
                      <Image
                        source={{ uri: `${item.uri}` }}
                        style={{
                          width: 300,
                          height: 200,
                          resizeMode: "cover",
                          borderRadius: 10,
                          marginRight: 10,
                        }}
                      />
                    </TouchableOpacity>
                  )}
                  showsHorizontalScrollIndicator={false}
                />
              )}
            </View>
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
                <TouchableOpacity
                  key={index}
                  onPress={() => handleEventPress(event)}
                >
                  <View style={styles.card}>
                    <Image
                      source={{ uri: event.eventImage }}
                      style={styles.cardImage}
                    />
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
  eventsContainer: {
    padding: 4,
  },
  flatListContainer: {
    padding: 12,
    paddingTop: 8,
  },
  card: {
    display: "flex",
    flexDirection: "row",
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
