import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import {
  Button,
  ButtonText,
  useToast,
  Toast,
  VStack,
  ToastTitle,
  ToastDescription,
  Box,
  Icon,
  HStack,
  Command,
  AvatarFallbackText,
  Edit,
  AvatarGroup,
  Heading,
  Avatar,
  Center,
} from "@gluestack-ui/themed";
import LottieView from "lottie-react-native";
import loadingAnimation from "../assets/loading.json";
import AvatarIcon from "../components/AvatarIcon";
import { useVocabularyList } from "../api/courses";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { AntDesign } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";


const VocabularyItemsScreen = ({ route, navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigation2 = useNavigation();
  const { courseId } = route.params;

  const {
    data: vocabularyData,
    error,
    isLoading,
  } = useVocabularyList(courseId);
  const toast = useToast();

  const offsetX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const rotateY = useSharedValue(0);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const frontCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offsetX.value },
        { rotateY: `${rotateY.value}deg` },
      ],
      opacity: opacity.value,
    };
  });

  const backCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offsetX.value },
        { rotateY: `${rotateY.value + 180}deg` },
      ],
      opacity: opacity.value,
    };
  });

  const updateIndex = (newIndex, direction) => {
    setCurrentIndex(newIndex);
    offsetX.value = direction === "next" ? -300 : 300;
    opacity.value = 0;
    offsetX.value = withTiming(0, { duration: 300 });
    opacity.value = withTiming(1, { duration: 300 });
    setIsFlipped(false);
    rotateY.value = withTiming(0, { duration: 300 });
  };

  const handleNextWord = () => {
    if (currentIndex < vocabularyData.length - 1) {
      offsetX.value = withTiming(300, { duration: 300 }, () => {
        runOnJS(updateIndex)(currentIndex + 1, "next");
      });
    }
  };

  const handlePrevWord = () => {
    if (currentIndex > 0) {
      offsetX.value = withTiming(-300, { duration: 300 }, () => {
        runOnJS(updateIndex)(currentIndex - 1, "prev");
      });
    }
  };

  const flipCard = () => {
    if (isFlipped) {
      rotateY.value = withTiming(0, { duration: 300 });
    } else {
      rotateY.value = withTiming(180, { duration: 300 });
    }
    setIsFlipped(!isFlipped);
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
    return (
      <SafeAreaView>
        <Text>An error occurred!</Text>
      </SafeAreaView>
    );
  }

  if (!vocabularyData || vocabularyData.length === 0) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-2xl font-bold">No vocabulary data available.</Text>
        <Text className="text-xl mt-4">Go Back to Course List</Text>
        <View className="flex flex-row justify-between px-4 items-center">
            <TouchableOpacity
              onPress={() => navigation.navigate("VocabularyCourse")}
              className="bg-tblack p-2 rounded-full ml-4 mt-4 w-9"
              style={{backgroundColor:"black"}}
            >
              <ArrowLeftIcon size="20" color="white" />
            </TouchableOpacity>
          </View>
      </SafeAreaView>
    );
  }

  const currentWord = vocabularyData[currentIndex];

  const saveVocabularyData = async (wordData) => {
    try {
      const jsonValue = await AsyncStorage.getItem("vocabularyData");
      let existingData = [];
      if (jsonValue !== null) {
        existingData = JSON.parse(jsonValue);
        // Check if the word already exists in the vocabulary data
        const isDuplicate = existingData.some(
          (item) => item.word === wordData.word
        );
        if (isDuplicate) {
          toast.show({
            placement: "top",
            render: ({ id }) => {
              const toastId = "toast-" + id;
              return (
                <Toast nativeID={toastId} action="error" variant="accent">
                  <VStack space="xs">
                    <ToastTitle>
                      {wordData.word} kelimesi zaten kaydedilmiş!
                    </ToastTitle>
                    <ToastDescription></ToastDescription>
                  </VStack>
                </Toast>
              );
            },
          });
          return;
        }
      }
      existingData.push({
        word: wordData.word,
        description: wordData.description,
      });
      await AsyncStorage.setItem(
        "vocabularyData",
        JSON.stringify(existingData)
      );
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="accent">
              <VStack space="xs">
                <ToastTitle>{wordData.word} Başarıyla kaydedildi!</ToastTitle>
                <ToastDescription></ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    } catch (error) {
      console.error("Kelime kaydetme hatası:", error);
      alert("Kelime kaydetme hatası!");
    }
  };

 

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView className="flex flex-row  justify-between mx-8  items-center">
        <TouchableOpacity
          className="mt-3"
          onPress={openDrawer}
          android_ripple={{ color: "transparent" }}
        >
          <Octicons name="three-bars" size={24} color="black" />
        </TouchableOpacity>
        <View className=" flex-1 justify-center items-center mt-3">
          <Text className="font-semibold text-2xl">Vocabulary Items</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
        ></TouchableOpacity>
        <AvatarIcon navigation={navigation} />
      </SafeAreaView>
      <SafeAreaView style={styles.main}>
        <TouchableOpacity onPress={flipCard}>
          <Animated.View style={[styles.cardContainer, frontCardStyle]}>
            {currentWord ? (
              <Text style={styles.cardText}>{currentWord.word}</Text>
            ) : (
              <Text style={styles.cardText}>No word available</Text>
            )}
          </Animated.View>
          <Animated.View
            style={[styles.cardContainer, backCardStyle, styles.cardBack]}
          >
            {currentWord ? (
              <Text style={styles.cardText}>{currentWord.description}</Text>
            ) : (
              <Text style={styles.cardText}>No description available</Text>
            )}
          </Animated.View>
        </TouchableOpacity>
      </SafeAreaView>
      <SafeAreaView className="mb-8">
        <View className="items-center mb-6">
          <View className="w-1/3">
            <Button
              size="md"
              variant="solid"
              action="primary"
              bg="$dimgray"
              isDisabled={false}
              isFocusVisible={false}
              onPress={() => saveVocabularyData(currentWord)}
            >
              <ButtonText>SAVE</ButtonText>
            </Button>
          </View>
        </View>
        <View className="flex flex-row justify-evenly mb-24">
          <View className="w-1/3">
            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              onPress={handlePrevWord}
              bg="$dimgray"
            >
              <ButtonText>
                <AntDesign name="arrowleft" size={24} color="white" />
              </ButtonText>
            </Button>
          </View>
          <View className="w-1/3">
            <Button
              size="md"
              variant="solid"
              action="primary"
              color="$textLight900"
              bg="$dimgray"
              isDisabled={false}
              isFocusVisible={false}
              onPress={handleNextWord}
            >
              <ButtonText>
                <AntDesign name="arrowright" size={24} color="white" />
              </ButtonText>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gainsboro",
  },
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  cardContainer: {
    width: 200,
    height: 300,
    backgroundColor: "#030647",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backfaceVisibility: "hidden",
  },
  cardBack: {
    position: "absolute",
    top: 0,
    paddingHorizontal: 16,
    backfaceVisibility: "hidden",
    backgroundColor: "#030647",
    transform: [{ rotateY: "180deg" }],
  },
  cardText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default VocabularyItemsScreen;
