import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Linking } from "react-native";
import { Button, Icon, LinkIcon } from "@gluestack-ui/themed";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

const AnnouncementScreen = ({ navigation, route }) => {
  const { id, uri, url } = route.params;
  const [announcement, setAnnouncement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const { data, error } = await supabase
          .from("announcements")
          .select("*")
          .eq("id", id)
          .single();
        if (error) {
          alert("Announcement does not exist");
          console.error("Error fetching announcement:", error.message);
          return;
        }
        setAnnouncement(data);
      } catch (error) {
        console.error("Error fetching announcement:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAnnouncement();
  }, [id]);

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={{ flex: 1 }}>
          <View className="flex flex-row justify-between px-4 items-center">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="bg-dimgray p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-4 w-9"
            >
              <ArrowLeftIcon size="20" color="white" />
            </TouchableOpacity>
          </View>
          <View
            style={{
              padding: "4%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 24, fontWeight: "bold" }}>
              {announcement?.title}
            </Text>
          </View>
          <View
            style={{
              width: "100%",
              borderBottomColor: "#B8B9BC",
              opacity: 0.5,
              borderBottomWidth: 1.5,
              alignSelf: "center",
              marginTop: 10,
            }}
          />
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            <View
              style={{
                paddingLeft: "5%",
                paddingTop: "5%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={{ uri }}
                style={{
                  width: 300,
                  height: 200,
                  resizeMode: "cover",
                  borderRadius: 10,
                  marginRight: 10,
                }}
              />
            </View>
            <View
              style={{
                padding: "4%",

                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16 }}>{announcement?.body}</Text>
            </View>
            {url !== null && (
              <View
                style={{
                  height: "100%",
                  paddingLeft: "5%",
                  paddingTop: "5%",
                  marginVertical: 16,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Button
                  style={{ width: "70%", marginBottom: "10%" }}
                  onPress={() => Linking.openURL(`${url}`)}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "500",
                      color: "white",
                    }}
                  >
                    Go to website
                  </Text>
                  <Icon
                    style={{ color: "white" }}
                    as={LinkIcon}
                    m="$2"
                    w="$6"
                    h="$6"
                  />
                </Button>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AnnouncementScreen;
