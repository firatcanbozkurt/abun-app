import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
  HStack,
  Avatar,
  AvatarFallbackText,
  Badge,
  BadgeIcon,
  BadgeText,
} from "@gluestack-ui/themed";
import { AntDesign } from "@expo/vector-icons";
const BlogListItem = ({ profileName, tag, title, openListItem }) => {
  function trimTitle(str, maxLength = 20) {
    str = str.trim();
    if (str.length > maxLength) {
      let truncatedString = str.substring(0, maxLength);
      truncatedString += " ...";
      return truncatedString;
    }
    return str;
  }

  title = trimTitle(title);
  return (
    <TouchableOpacity onPress={openListItem}>
      <View style={{ marginHorizontal: 8, marginTop: 8, height: 60 }}>
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
              <View style={{ display: "flex", flexDirection: "row" }}>
                {tag && (
                  <Badge
                    size="lg"
                    variant="solid"
                    borderRadius="$md"
                    action={tag === "I can help" ? "success" : "warning"}
                  >
                    <BadgeText>{tag}</BadgeText>
                  </Badge>
                )}
                <Text> </Text>
                <Text style={{ fontSize: 16, fontWeight: "300" }}>{title}</Text>
              </View>
              <Text style={{ fontSize: 14, color: "#2743FD" }}>
                {profileName}
              </Text>
            </View>
          </View>
          <View style={{ justifyContent: "center" }}>
            <AntDesign name="right" size={24} color="#2B47FC" />
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
    </TouchableOpacity>
  );
};

export default BlogListItem;
