import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useVocabularyCourses } from "../api/courses";

const VocabularyCourseList = () => {
  const navigation = useNavigation();
  const { data: coursesData, error, isLoading } = useVocabularyCourses();

console.log(coursesData)

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
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


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Courses</Text>
      </View>
      <View style={styles.courseList}>
        {coursesData.map((course) => (
          <TouchableOpacity
            key={course.id}
            style={styles.courseItem}
            onPress={() => navigation.navigate("VocabularyItems", { courseId: course.id })}
          >
            <Text style={styles.courseName}>{course.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  courseList: {
    marginTop: 16,
  },
  courseItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  courseName: {
    fontSize: 18,
  },
});

export default VocabularyCourseList;
