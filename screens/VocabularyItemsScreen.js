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

import AvatarIcon from "../components/AvatarIcon";
import { useExamList } from "../api/exams";
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
  const navigation = useNavigation();
  const { error, isLoading } = useExamList();

  const [isFlipped, setIsFlipped] = useState(false);

  const rotation = useSharedValue(0);
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
    return <Text>An error occured!</Text>;
  }

  return (
    <>
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
            <Text style={styles.cardText}>Front</Text>
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
            <Text style={styles.cardText}>Back</Text>
          </Animated.View>
        </TapGestureHandler>
      </View>
    </GestureHandlerRootView>
    </SafeAreaView>
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
/*
  return (
    <GestureHandlerRootView style={{flex:1}}>
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
  
      <View className="flex-1 p-12 mt-8">
        <View className="flex  items-center justify-center w-full h-full rounded-xl">
          <TapGestureHandler onHandlerStateChange={({nativeEvent}) => {
            if(nativeEvent.state === State.END){
              toggleFlip();
            }
          }}>
          <Animated.View
            style={frontCardStyle}
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
          </TapGestureHandler>

          <TapGestureHandler onHandlerStateChange={({nativeEvent}) => {
            if(nativeEvent.state === State.END){
              toggleFlip();
            }
          }}>
          <Animated.View
            style={[
              backCardStyle,
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
          </TapGestureHandler>
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
    </GestureHandlerRootView>
  );

*/
export default VocabularyItemsScreen;

/***    <TouchableOpacity onPress={}>
        <Feather name="refresh-cw" size={24} color="black" />
      </TouchableOpacity> */
