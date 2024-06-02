import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Image } from "react-native";
import { supabase } from "../supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Avatar, AvatarFallbackText, AvatarImage } from "@gluestack-ui/themed";
import club1 from "../assets/clubIcon1.png";

const ClubDetailsScreen = ({ route }) => {
  const { communityId } = route.params;
  const [club, setClub] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClub = async () => {
      const { data, error } = await supabase
        .from("communities")
        .select("*")
        .eq("id", communityId)
        .single();

      if (error) {
        console.error("Error fetching club details:", error);
      } else {
        setClub(data);
      }
      setIsLoading(false);
    };

    fetchClub();
  }, [communityId]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!club) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Club not found</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Avatar size="xl" style={styles.avatar}>
          <AvatarFallbackText fontFamily="$heading">JD</AvatarFallbackText>
          <AvatarImage source={club1} alt="image" style={styles.avatarImage} />
        </Avatar>
        <Text style={styles.name}>{club.name}</Text>
      </View>
      <Text style={styles.description}>{club.description}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Number of Events: {club.numberOfEvents}</Text>
        <Text style={styles.infoText}>Number of Members: {club.numberOfMembers}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: '#f8bbd0', // Light pink background
    borderWidth: 3,
    borderColor: '#fff',
    elevation: 5,
  },
  avatarImage: {
    borderRadius: 75, // Half of the Avatar size (150 / 2)
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
});

export default ClubDetailsScreen;
