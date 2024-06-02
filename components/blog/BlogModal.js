import { View, Text, SafeAreaView, Linking } from "react-native";
import React, { useState } from "react";
import {
  HStack,
  Avatar,
  AvatarFallbackText,
  Badge,
  BadgeIcon,
  BadgeText,
  ScrollView,
  Button,
  Icon,
  ShareIcon,
  CloseIcon,
} from "@gluestack-ui/themed";
import { format, getDay } from "date-fns";
import { useAuth } from "../context/AuthProvider";
import { supabase } from "../../supabase";

const BlogModal = ({ navigation, route }) => {
  const [deleting, setDeleting] = useState(false);
  const { profile } = useAuth();
  const { id, profileName, tag, title, body, user_email, uuid, timestamp } =
    route.params;
  const dateObject = new Date(timestamp);
  const formattedDate = format(dateObject, "MMMM d, yyyy");

  const handleDelete = async () => {
    setDeleting(true);
    await supabase
      .from("blog_post")
      .delete()
      .eq("id", id)
      .then((res) => {
        console.log("NORMAL NMMMN Route params:", route.params);
        console.log("Navigation:", navigation);
        route.params.onGoBack({ isTrue: true, id: id });
        navigation.goBack();
      });
  };

  return (
    <View className="bg-primary" style={{ flex: 1 }}>
      <View style={{ paddingLeft: "5%", paddingTop: "5%" }}>
        <Text style={{ fontSize: 36, fontWeight: "bold" }}>{title}</Text>
      </View>
      <View style={{ marginHorizontal: "5%", marginTop: "5%", height: 60 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              height: 45,
              alignItems: "center",
            }}
          >
            <View>
              <HStack space="md" h="100%">
                <View>
                  <Avatar size="md" bgColor="$purple600">
                    <AvatarFallbackText>{profileName}</AvatarFallbackText>
                  </Avatar>
                </View>
              </HStack>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 10,
                marginTop: 4,
              }}
            >
              <Text style={{ fontSize: 16, color: "#2743FD" }}>
                {profileName}
              </Text>
            </View>
            <View style={{ marginHorizontal: 16 }}>
              {tag && (
                <Badge
                  size="lg"
                  variant="solid"
                  borderRadius="$md"
                  action={!tag ? "success" : "warning"}
                >
                  <BadgeText>{tag}</BadgeText>
                </Badge>
              )}
            </View>
          </View>
        </View>
        <View
          style={{
            padding: 8,
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16 }}>{formattedDate}</Text>
        </View>
        <View // Horizontal line
          style={{
            width: "100%",
            borderBottomColor: "#B8B9BC",
            opacity: 0.5,
            borderBottomWidth: 1.5,
            alignSelf: "center",
            marginVertical: 8,
          }}
        />
      </View>
      <ScrollView style={{ padding: 24, marginVertical: 32 }}>
        <Text style={{ fontSize: 16 }}>{body}</Text>
      </ScrollView>

      <SafeAreaView
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {uuid === profile?.uuid ? (
          <Button
            isDisabled={deleting}
            action="negative"
            style={{ width: "70%", marginBottom: "10%" }}
            onPress={handleDelete}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: "white",
              }}
            >
              Delete post
            </Text>
            <Icon
              style={{ color: "white" }}
              as={CloseIcon}
              m="$2"
              w="$6"
              h="$6"
            />
          </Button>
        ) : (
          <Button
            style={{ width: "70%", marginBottom: "10%" }}
            onPress={() => Linking.openURL(`mailto:${user_email}`)}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: "white",
              }}
            >
              Send Email
            </Text>
            <Icon
              style={{ color: "white" }}
              as={ShareIcon}
              m="$2"
              w="$6"
              h="$6"
            />
          </Button>
        )}
      </SafeAreaView>
    </View>
  );
};

export default BlogModal;
