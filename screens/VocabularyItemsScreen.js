import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, TouchableOpacity, Text, Animated } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import DownloadView from "../components/DownloadView";

import AvatarIcon from "../components/AvatarIcon";
import { useExamList } from "../api/exams";
import LottieView from "lottie-react-native";
import loadingAnimation from "../assets/loading.json";
import { Button, ButtonText } from "@gluestack-ui/themed";

const VocabularyItemsScreen = () => {
  const navigation = useNavigation();
  const [isFlipped, setIsFlipped] = useState(false);
  const { error, isLoading } = useExamList();

  const flipAnimation = new Animated.Value(0);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    Animated.spring(flipAnimation, {
      toValue: isFlipped ? 0 : 180,
      useNativeDriver: true,
    }).start();
  };
  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };
  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
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
          <Text className="text-twhite text-4xl">CENG-SENG</Text>
          <Text className="text-twhite text-3xl">Vocabulary Items</Text>
        </View>
      </SafeAreaView>
      <TouchableOpacity onPress={handleFlip}>
        <Feather name="refresh-cw" size={24} color="black" />
      </TouchableOpacity>
      <View className="flex-1 p-12 mt-8">
        <View className="flex  items-center justify-center w-full h-full rounded-xl">
          <Animated.View
            style={frontAnimatedStyle}
            className="absolute  bg-vocabCard-100 items-center justify-center p-8 rounded-xl"
          >
            <Text className="text-twhite text-2xl font-bold">API</Text>
            <Text className="text-twhite text-md font-semibold">
              Application Programming Interface Application Programming
              Interface Application Programming Interface Application
              Programming Interface Application Programming Interface
              Application Programming Interface Application Programming
              Interface Application Programming Interface Application
              Programming Interface Application Programming Interface
              Application Programming Interface Application Programming
              Interface
            </Text>
          </Animated.View>
          <Animated.View
            style={[
              backAnimatedStyle,
              {
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: "blue",
                alignItems: "center",
                justifyContent: "center",
                backfaceVisibility: "hidden",
              },
            ]}
          >
            <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
              Back of the card
            </Text>
            <Text style={{ color: "white", fontSize: 18 }}>
              Back of the card description...
            </Text>
          </Animated.View>
        </View>
      </View>
      <SafeAreaView className=" mb-8">
        <View className="flex flex-row justify-evenly  ">
          <View className="w-1/3">
            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
            >
              <ButtonText>PREV </ButtonText>
            </Button>
          </View>
          <View className="w-1/3">
            <Button
              size="md"
              variant="solid"
              action="primary"
              isDisabled={false}
              isFocusVisible={false}
            >
              <ButtonText>NEXT </ButtonText>
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default VocabularyItemsScreen;
