import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

import {
  Input,
  InputField,
  InputSlot,
  SearchIcon,
  InputIcon,
  Button,
  ButtonText,
  Icon,
  ArrowDownIcon,
} from "@gluestack-ui/themed";
import BlogListItem from "../components/blog/BlogListItem";
import { useBlogList } from "../api/blog";
import { useAuth } from "../components/context/AuthProvider";
const BlogScreen = ({ navigation, route }) => {
  const { profile } = useAuth();
  const [postData, setPostData] = useState([]);
  const [postAction, setPostAction] = useState({});
  const [search, setSearch] = useState(""); // Will be used for searching blogs
  const { data, isLoading, error } = useBlogList();
  if (error) {
    alert("Error fetching posts");
  }

  const openCreatePostModal = () => {
    navigation.navigate("BlogCreatePostModal", {
      onGoBack: (data) => setPostAction(data),
    });
  };

  useEffect(() => {
    if (data !== undefined) {
      setPostData(data);
      console.log(postData);
    }
  }, [data]);

  useEffect(() => {
    if (postAction?.isTrue) {
      setPostData((prevData) => {
        return prevData.filter((post) => post.id !== postAction?.id);
      });
    }
    if (postAction?.isAdded) {
      setPostData((prevData) => {
        return [
          ...prevData,
          {
            uuid: profile?.uuid,
            id: postAction?.id, // to avoid id conflicts without fetching from the server
            full_name: postAction?.full_name,
            title: postAction?.title,
            tag: postAction?.tag,
            body: postAction?.body,
            user_email: postAction?.user_email,
            created_at: new Date().toISOString(), // to avoid timestamp conflicts without fetching from the server
          },
        ];
      });
    }
  }, [postAction]);

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
      <View className="px-6 py-4 flex-1 ">
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

        <ScrollView className="mt-4 " showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : postData.length > 0 ? (
            postData.map((post) => {
              return (
                <BlogListItem
                  key={post.id}
                  profileName={post.full_name}
                  tag={post.tag}
                  title={post.title}
                  uuid={post.uuid}
                  timestamp={post.created_at}
                  openListItem={() => {
                    navigation.navigate("BlogModal", {
                      onGoBack: (data) => setPostAction(data),
                      id: post.id,
                      profileName: post.full_name,
                      title: post.title,
                      tag: post.tag,
                      body: post.body,
                      user_email: post.user_email,
                      uuid: post.uuid,
                      timestamp: post.created_at,
                    });
                  }}
                />
              );
            })
          ) : (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text style={{ fontSize: 24 }}>No posts found!</Text>
              <Text style={{ fontSize: 16 }}>
                You can create the first post below.
              </Text>
              <Icon as={ArrowDownIcon} m="$2" w="$16" h="$16" />
            </View>
          )}
        </ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Button style={{ width: "45%" }} onPress={openCreatePostModal}>
            <ButtonText size="md">My posts</ButtonText>
          </Button>
          <Button style={{ width: "45%" }} onPress={openCreatePostModal}>
            <ButtonText size="md">Create a post</ButtonText>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default BlogScreen;
