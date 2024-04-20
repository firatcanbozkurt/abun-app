import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useState, useRef } from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import {
  Input,
  InputField,
  InputSlot,
  SearchIcon,
  InputIcon,
} from "@gluestack-ui/themed";
import BlogListItem from "../components/blog/BlogListItem";
import { blogData } from "../assets/blogListItemDemo";
const BlogScreen = ({ navigation }) => {
  const [search, setSearch] = useState(""); // Will be used for searching blogs
  // Scrool view should be fixed, we cannot see the whole content
  return (
    <View className="flex-1">
      <SafeAreaView
        className="flex bg-primary h-1/4 "
        style={{ borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}
      >
        <View className="flex flex-row justify-between px-4 items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-secondary p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-4 w-9"
          >
            <ArrowLeftIcon size="20" color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex  items-center mt-3">
          <Text className="text-twhite text-4xl">Blog</Text>
        </View>
      </SafeAreaView>
      <View className="px-6 py-4">
        <Input
          variant="rounded"
          size="lg"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputSlot pl="$3">
            <InputIcon as={SearchIcon} />
          </InputSlot>
          <InputField
            onChangeText={(e) => setSearch(e)}
            placeholder="Search blogs..."
          />
        </Input>

        <ScrollView className="mt-4" showsVerticalScrollIndicator={false}>
          {blogData.map((blog, id) => {
            return (
              <BlogListItem
                key={id}
                profileName={blog.profileName}
                tag={blog.tag}
                title={blog.title}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default BlogScreen;
