import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../supabase";
import {
  HStack,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@gluestack-ui/themed";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import LottieView from "lottie-react-native";
import loadingAnimation from "../assets/loading.json";
import AvatarIcon from "../components/AvatarIcon";

const AllEventsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState([]);
  const navigation2 = useNavigation();

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

        setEventData(
          data.map((event) => ({
            ...event,
            eventImage: imageUrls[eventIds.indexOf(event.id)],
          }))
        );
      } catch (error) {
        console.error("Error fetching all events:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllEvents();
  }, []); 

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

  const handleEventPress = (selectedEvent) => {
    console.log("Selected Event ID:", selectedEvent.id);
    navigation2.navigate("Event", { eventData: selectedEvent });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View className="flex flex-row justify-between p-4  items-center mb-4">
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className="bg-tblack-900 p-2 rounded-tr-2xl rounded-bl-2xl ml-5 mt-4 w-9"
          >
            <ArrowLeftIcon size="20" color="white" />
          </TouchableOpacity>
          <Text className="pt-4 text-2xl font-semibold">EVENTS</Text>
          <AvatarIcon />
        </View>
      </View>
      <FlatList
        data={eventData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCard}
        contentContainerStyle={styles.flatListContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
  },
  flatListContainer: {
    padding: 34,
    paddingTop: 48,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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

export default AllEventsScreen;
