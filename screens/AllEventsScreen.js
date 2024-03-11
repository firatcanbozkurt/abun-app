import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../supabase";

const AllEventsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [eventData, setEventData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const { data, error } = await supabase.from("eventTest").select("*");

        if (error) {
          console.error("Error fetching all events:", error.message);
          return;
        }

        setEventData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching all events:", error.message);
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
    return <Text>Loading...</Text>;
  }

  const handleEventPress = (selectedEvent) => {
    console.log("Selected Event ID:", selectedEvent.id); // Seçilen etkinliğin ID'sini kontrol et

    navigation.navigate("Event", { id: selectedEvent.id });
  };

  return (
    <SafeAreaView style={styles.container}>
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
    paddingBottom: 16,
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
