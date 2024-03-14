import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Text,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import DownloadView from "../components/DownloadView";
import { supabase } from "../supabase";
import { get } from "@gluestack-style/react";
import TabNavigator from "../navigatiors/TabNavigator";
import AvatarIcon from "../components/AvatarIcon";
import { useExamList } from "../api/exams";
import LottieView from "lottie-react-native";
import loadingAnimation from "../assets/loading.json";

const PastExamScreen = () => {
  const navigation = useNavigation();
  const { data: exams, error, isLoading } = useExamList();
  console.log(exams);
  const getExamPdf = async ({ id }) => {
    try {
      const { data, error } = await supabase.storage
        .from("past_exams") // Storage bucket name
        .list("CENG 471", {
          // Folder name
          limit: 100,
          offset: 0,
          sortBy: { column: "name", order: "asc" },
          search: `${id}.pdf`, // search by id
        });
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  if (isLoading) {
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

  if (error) {
    return <Text>An error occured!</Text>;
  }

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
          <AvatarIcon navigation={navigation} />
        </View>
        <View className="flex  items-center mt-3">
          <Text className="text-twhite text-4xl">Past Exams </Text>
          <Text className="text-twhite text-3xl">CENG-SENG</Text>
        </View>
      </SafeAreaView>
      <View className="flex  pt-8">
        {exams.map((exam, id) => {
          return <DownloadView key={id} title={exam.name} />;
        })}
      </View>
    </View>
  );
};
export default PastExamScreen;
