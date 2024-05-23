import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { Button, ButtonText } from "@gluestack-ui/themed";
import LottieView from "lottie-react-native";
import loadingAnimation from "../assets/loading.json";
import AvatarIcon from "../components/AvatarIcon";
import { useVocabularyList } from "../api/exams";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

const VocabularyItemsScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigation = useNavigation();
  const { data: vocabularyData, error, isLoading } = useVocabularyList();

  const offsetX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const rotateY = useSharedValue(0);

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
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex bg-primary h-1/4" style={{ borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>
        <View className="flex flex-row justify-between px-4 items-center">
          <TouchableOpacity onPress={() => navigation.goBack()} className="bg-secondary p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-4 w-9">
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
        <TouchableOpacity onPress={flipCard}>
          <Animated.View style={[styles.cardContainer, frontCardStyle]}>
            {currentWord ? (
              <Text style={styles.cardText}>{currentWord.word}</Text>
            ) : (
              <Text style={styles.cardText}>No word available</Text>
            )}
          </Animated.View>
          <Animated.View style={[styles.cardContainer, backCardStyle, styles.cardBack]}>
            {currentWord ? (
              <Text style={styles.cardText}>{currentWord.description}</Text>
            ) : (
              <Text style={styles.cardText}>No description available</Text>
            )}
          </Animated.View>
        </TouchableOpacity>
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
    </GestureHandlerRootView>
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
    position: "absolute",
    top: 0,
    backfaceVisibility: "hidden",
    backgroundColor: "#B52FF8",
    transform: [{ rotateY: "180deg" }],
  },
  cardText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default VocabularyItemsScreen;
