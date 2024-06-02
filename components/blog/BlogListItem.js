import { View, Text } from "react-native";
import React from "react";
import { HStack, Avatar, AvatarFallbackText } from "@gluestack-ui/themed";
import { AntDesign } from "@expo/vector-icons";
const BlogListItem = ({ profileName, tag, title }) => {
  function trimTitle(str, maxLength = 20) {
    str = str.trim();
    if (str.length > maxLength) {
      let truncatedString = str.substring(0, maxLength);
      truncatedString += " ...";
      return truncatedString;
    }
    return str;
  }
  const tagColor = tag === 1 ? "#A02BFC" : "#4BC27E";
  tag === 1 ? (tag = "Help me :") : (tag = "I can help :"); // Tag names are changed based on the type

  title = trimTitle(title);
  return (
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
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "800",
                  color: `${tagColor}`,
                }}
              >
                {tag}
              </Text>
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
  );
};

export default BlogListItem;
