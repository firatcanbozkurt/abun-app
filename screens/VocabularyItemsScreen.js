import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import AsyncStorage from '@react-native-async-storage/async-storage';

import AvatarIcon from "../components/AvatarIcon";
import { useExamList, useVocabularyList } from "../api/exams";
import LottieView from "lottie-react-native";
import loadingAnimation from "../assets/loading.json";
import { Button, ButtonText } from "@gluestack-ui/themed";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  interpolate,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  TapGestureHandler,
  State,
} from "react-native-gesture-handler";

const VocabularyItemsScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const navigation = useNavigation();
  const { data: vocabularyData, error, isLoading } = useVocabularyList();

  const [isFlipped, setIsFlipped] = useState(false);

  const rotation = useSharedValue(0);

  const saveVocabularyData = async (wordData) => {
    try {
      const jsonValue = await AsyncStorage.getItem('vocabularyData');
      let existingData = [];
      if (jsonValue !== null) {
        existingData = JSON.parse(jsonValue);
      }
      existingData.push({ word: wordData.word, description: wordData.description });
      await AsyncStorage.setItem('vocabularyData', JSON.stringify(existingData));
      alert('Kelime başarıyla kaydedildi!');
    } catch (error) {
      console.error('Kelime kaydetme hatası:', error);
      alert('Kelime kaydetme hatası!');
    }
  };

  const frontAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotation.value, [0, 1], [0, 180]);
    return {
      transform: [
        { rotateY: withTiming(`${rotateValue}deg`, { duration: 1000 }) },
      ],
    };
  });

  const toggleFlip = () => {
    rotation.value = withTiming(
      isFlipped ? 0 : 180,
      {
        duration: 500,
        easing: Easing.ease,
      },
      () => {
        runOnJS(setIsFlipped)(!isFlipped);
      }
    );
  };

  const frontCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotation.value}deg` }],
    };
  });

  const backCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { perspective: 1000 },
        { rotateY: `${rotation.value + 180}deg` },
      ],
    };
  });

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
    return <Text>An error occurred!</Text>;
  }

  if (!vocabularyData || vocabularyData.length === 0) {
    return <Text>No vocabulary data available.</Text>;
  }

  const currentWord = vocabularyData[currentIndex];

  const handleNextWord = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % vocabularyData.length);
  };

  const handlePrevWord = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + vocabularyData.length) % vocabularyData.length);
  };

  return (
    <>
      <SafeAreaView
        className="flex bg-primary h-1/4"
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
        <View className="flex items-center mt-3">
          <Text className="text-twhite text-4xl">CENG-SENG</Text>
          <Text className="text-twhite text-3xl">Vocabulary Items</Text>
        </View>
      </SafeAreaView>
      <SafeAreaView style={styles.container}>
        <GestureHandlerRootView>
          <View style={styles.container}>
            <TapGestureHandler
              onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.END) {
                  toggleFlip();
                }
              }}
            >
              <Animated.View style={[styles.cardContainer, frontCardStyle]}>
                {currentWord ? (
                  <Text style={styles.cardText}>{currentWord.word}</Text>
                ) : (
                  <Text style={styles.cardText}>No word available</Text>
                )}
              </Animated.View>
            </TapGestureHandler>
            <TapGestureHandler
              onHandlerStateChange={({ nativeEvent }) => {
                if (nativeEvent.state === State.END) {
                  toggleFlip();
                }
              }}
            >
              <Animated.View
                style={[styles.cardContainer, backCardStyle, styles.cardBack]}
              >
                {currentWord ? (
                  <Text style={styles.cardText}>{currentWord.description}</Text>
                ) : (
                  <Text style={styles.cardText}>No description available</Text>
                )}
              </Animated.View>
            </TapGestureHandler>
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
      <SafeAreaView className="mb-8">
        <View className="items-center mb-4">
          <View className="w-1/3">
            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              onPress={() => saveVocabularyData(currentWord)}
            >
              <ButtonText>SAVE</ButtonText>
            </Button>
          </View>
        </View>
        <View className="flex flex-row justify-evenly">
          <View className="w-1/3">
            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              onPress={handlePrevWord}
            >
              <ButtonText>PREV</ButtonText>
            </Button>
          </View>
          <View className="w-1/3">
            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
              onPress={handleNextWord}
            >
              <ButtonText>NEXT</ButtonText>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: 200,
    height: 300,
    backgroundColor: "#030637",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backfaceVisibility: "hidden",
  },
  cardBack: {
    backgroundColor: "lightcoral",
    position: "absolute",
  },
  cardText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default VocabularyItemsScreen;
