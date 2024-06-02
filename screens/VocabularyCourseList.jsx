import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useVocabularyCourses } from "../api/courses";
import { TextInput } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import LottieView from "lottie-react-native";
import loadingAnimation from "../assets/loading.json";

const VocabularyCourseList = () => {
  const navigation = useNavigation();
  const { data: coursesData, error, isLoading } = useVocabularyCourses();
  const [searchText, setSearchText] = useState("");

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
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error: {error}</Text>
      </SafeAreaView>
    );
  }

  if (!coursesData || coursesData.length === 0) {
    return <Text>No vocabulary data available.</Text>;
  }

  const filteredCourses = coursesData.filter(course => course.name.toLowerCase().includes(searchText.toLowerCase()))

  const renderItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [styles.courseItem, pressed && styles.courseItemPressed]}
      onPress={() => navigation.navigate("VocabularyItems", { courseId: item.id })}
    >
      <Text style={styles.courseName}>{item.name}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>COURSES</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={setSearchText} 
            value={searchText} 
          />
          <AntDesign name="search1" size={20} color="#666" style={styles.searchIcon} />
        </View>
      </View>
      <FlatList
        data={filteredCourses}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.courseList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f4f7",
  },
  header: {
    paddingBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    marginTop: 12,
  },
  courseList: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 16,
    marginTop:16,
    marginHorizontal:16,
    paddingHorizontal: 10, 
    borderWidth: 1, 
    width:'75%'
    
  },
  searchInput: {
    flex: 1, 
    height: 40,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
  courseItem: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: 'center',
  },
  courseName: {
    fontSize: 20,
    color: "#333",
  },
  courseItemPressed: {
    backgroundColor: "#e6e6e6",
  }
});

export default VocabularyCourseList;
