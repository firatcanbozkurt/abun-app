import React, { useEffect, useState } from "react";
import {
  NativeBaseProvider,
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  HStack,
  Center,
  Pressable,
} from "native-base";
import { useNavigation } from "@react-navigation/native";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
function Footer() {
  const [selected, setSelected] = React.useState(1);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribeHome = navigation.addListener("focus", () => {
      // Eğer sayfa odaklı ise ve seçili sekme Home değilse, Home'a yönlendir
      if (navigation.isFocused() && selected !== 0) {
        setSelected(0);
        navigation.navigate("Home");
      } else if (navigation.isFocused() && selected !== 1) {
        setSelected(1);
        navigation.navigate("Home"); // handle for clubs
      } else if (navigation.isFocused() && selected !== 2) {
        setSelected(2);
        navigation.navigate("Home"); // handle for events
      } else if (navigation.isFocused() && selected !== 3) {
        setSelected(3);
        navigation.navigate("Home"); // handle for  profile
      }
    });

    return unsubscribeHome;
  }, [selected, navigation]);

  return (
    <NativeBaseProvider>
      <Box flex={1} position="relative">
        <HStack
          bg="indigo.600"
          alignItems="center"
          shadow={6}
          position="absolute"
          bottom={-35}
          p={5}
        >
          <Pressable
            cursor="pointer"
            opacity={selected === 0 ? 1 : 0.5}
            py="3"
            flex={1}
            onPress={() => {
              setSelected(0);
              navigation.navigate("Home");
            }}
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={selected === 0 ? "home" : "home-outline"}
                  />
                }
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Home
              </Text>
            </Center>
          </Pressable>
          <Pressable
            cursor="pointer"
            opacity={selected === 1 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => {
              setSelected(1);
              navigation.navigate("Clubs");
            }}
          >
            <Center>
              <Icon
                mb="1"
                as={<Foundation name="social-myspace" />}
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Clubs
              </Text>
            </Center>
          </Pressable>
          <Pressable
            cursor="pointer"
            opacity={selected === 2 ? 1 : 0.6}
            py="2"
            flex={1}
            onPress={() => {
              setSelected(2);
              navigation.navigate("Events");
            }}
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialIcons
                    name={selected === 2 ? "event-note" : "event-note"}
                  />
                }
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Events
              </Text>
            </Center>
          </Pressable>
          <Pressable
            cursor="pointer"
            opacity={selected === 3 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => {
              setSelected(3);
              navigation.navigate("Profile");
            }}
          >
            <Center>
              <Icon
                mb="1"
                as={
                  <MaterialCommunityIcons
                    name={selected === 3 ? "account" : "account-outline"}
                  />
                }
                color="white"
                size="sm"
              />
              <Text color="white" fontSize="12">
                Profile
              </Text>
            </Center>
          </Pressable>
        </HStack>
      </Box>
    </NativeBaseProvider>
  );
}

export default Footer;
