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
import { Platform } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import DownloadView from "../components/DownloadView";
import { supabase } from "../supabase";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";
import AvatarIcon from "../components/AvatarIcon";
import { useExamList } from "../api/exams";
import LottieView from "lottie-react-native";
import loadingAnimation from "../assets/loading.json";
import { StorageAccessFramework } from "expo-file-system";

const PastExamScreen = () => {
  const navigation = useNavigation();
  const { data: exams, error, isLoading } = useExamList();
  const [downloading, setDownloading] = useState({
    downloading: false,
    id: "",
  });
  const downloadFromUrl = async ({ url, name }) => {
    let androidPermission = false;
    if (Platform.OS === "android") {
      const permissions =
        await StorageAccessFramework.requestDirectoryPermissionsAsync();
      if (permissions.granted) {
        androidPermission = true;
      }
    }
    if (androidPermission || Platform.OS === "ios") {
      const fileUri = FileSystem.documentDirectory + name + ".pdf";
      try {
        const { uri } = await FileSystem.downloadAsync(url, fileUri);
        console.log("Finished downloading to ", uri);
        setDownloading(false);
        await shareAsync(uri);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const getExamPdf = async ({ id, name }) => {
    console.log("Downloading exam with id: ", id);
    try {
      setDownloading({ downloading: true, id });
      const { data } = await supabase.storage // Data = public URL
        .from("past_exams") // Storage bucket name
        .getPublicUrl(`${id}.pdf`);
      const url = data?.publicUrl;
      downloadFromUrl({ url, name });
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
    <View className="flex-1 ">
      <SafeAreaView
        className="flex h-1/4 mt-4"
        style={{ borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}
      >
        <View className="flex flex-row justify-between px-4 items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className=" p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-4 w-9"
            style={{backgroundColor:"#000000"}}
          >
            <ArrowLeftIcon size="20" color="white" />
            
          </TouchableOpacity>
          <AvatarIcon navigation={navigation}  />
        </View>
        <View className=" relative items-center justify-center" style={{marginBottom:"10%"}}>
            <Text className="text-tblack text-4xl ">Past Exams</Text>
            <Text className="text-tblack text-3xl">CENG-SENG</Text>
          </View>
        
      </SafeAreaView>
      <View className="flex  pt-8">
        {exams.map((exam, id) => {
          return (
            <DownloadView
              key={id}
              title={exam.name}
              examId={exam.src}
              getExamPdf={() => getExamPdf({ id: exam.src, name: exam.name })}
              downloading={downloading}
            />
          );
        })}
      </View>
    </View>
  );
};
export default PastExamScreen;
