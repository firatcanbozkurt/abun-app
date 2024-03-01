import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, StyleSheet, Text, Image, Alert } from "react-native";
import DownloadView from "../components/DownloadView";
import { supabase } from "../supabase";
import { get } from "@gluestack-style/react";

const PastExamScreen = () => {
  const [exams, setExams] = useState([]);
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
  useEffect(() => {
    const getExams = async () => {
      try {
        const { data, error } = await supabase.from("past_exams").select("*");
        setExams(data);
      } catch (error) {
        console.log(error);
      }
    };
    getExams();
  }, []);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <Ionicons
            name="ios-arrow-back"
            size={24}
            color="#52575D"
            onPress={() => navigation.navigate("Home")}
          ></Ionicons>
          <Feather name="more-vertical" size={24} color="#52575D" />
        </View>
        {exams.map((exam, id) => {
          return <DownloadView key={id} title={exam.name} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Delete the unused styles

  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontFamily: "",
    //color: "#52575D",
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },

  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    margintop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0,0,0,0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  recentItemIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
  input: {
    width: "75%",
    height: 40,
    borderColor: "#DEE1EF",
    borderBottomWidth: 2,
    borderRadius: 4,
    padding: 3,
    marginTop: 5,
    marginBottom: 5,
  },
  customButton: {},
});

export default PastExamScreen;
