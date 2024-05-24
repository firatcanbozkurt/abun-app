import { View, Text, SafeAreaView, Linking } from "react-native";
import React from "react";
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
} from "@gluestack-ui/themed";

const BlogModal = ({ navigation, route }) => {
  const { id, profileName, tag, title, body, user_email } = route.params;

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
        <View // Horizontal line
          style={{
            width: "100%",
            borderBottomColor: "#B8B9BC",
            opacity: 0.5,
            borderBottomWidth: 1.5,
            alignSelf: "center",
            marginTop: 10,
          }}
        />
      </View>
      <ScrollView style={{ padding: 24 }}>
        <Text style={{ fontSize: 16 }}>{body}</Text>
      </ScrollView>

      <SafeAreaView
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
      </SafeAreaView>
    </View>
  );
};

export default BlogModal;
