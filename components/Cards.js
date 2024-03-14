import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Button,
  ButtonText,
  Card,
  Divider,
  Heading,
  Image,
  VStack,
  View,
} from "@gluestack-ui/themed";
import club1 from "../assets/clubIcon1.png";
import { GluestackUIProvider, Text, Box } from "@gluestack-ui/themed";
import { useNumberOfEvents } from "../api/clubs";
import { ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
function Cards({ name, id }) {
  const { data, error, isLoading } = useNumberOfEvents({ id });
  console.log(data);
  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <Card p="$6" borderRadius="$lg" maxWidth={360} m="$3">
      <Box flexDirection="row">
        <Avatar mr="$4">
          <AvatarFallbackText fontFamily="$heading">JD</AvatarFallbackText>
          <AvatarImage source={club1} alt="image" />
        </Avatar>
        <VStack>
          <Heading size="sm" fontFamily="$heading" mb="$1">
            {name}
          </Heading>
          <Text size="sm" fontFamily="$heading">
            janedoe@sample.com
          </Text>
        </VStack>
      </Box>
      <Box
        my="$5"
        sx={{
          flexDirection: "base",
          "@base": {
            my: "$6",
            flexDirection: "row",
          },
        }}
      >
        <VStack
          alignItems="center"
          justifyContent="center"
          sx={{
            pb: "$2",
            "@base": {
              flex: 1,
              pb: "$0",
              borderRightWidth: 1,
              borderColor: "$backgroundLight300",
              _dark: {
                borderRightColor: "$backgroundDark800",
              },
            },
          }}
        >
          <Heading size="xs" fontFamily="$heading">
            81
          </Heading>
          <Text size="xs">posts</Text>
        </VStack>
        <Divider
          orientation="vertical"
          height="40%"
          alignSelf="center"
          sx={{
            bg: "$backgroundLight300",
            display: "flex",
            _dark: {
              bg: "$backgroundDark800",
            },
            "@base": {
              display: "none",
            },
          }}
        />
        <VStack
          alignItems="center"
          flex="1"
          sx={{
            py: "$2",
            "@base": {
              flex: 1,
              py: "$0",
              borderRightWidth: 1,
              borderColor: "$backgroundLight300",
              _dark: {
                borderRightColor: "$backgroundDark800",
              },
            },
          }}
        >
          <Heading size="xs" fontFamily="$heading">
            5,281
          </Heading>
          <Text size="xs">Member</Text>
        </VStack>
        <Divider
          orientation="vertical"
          height="40%"
          alignSelf="center"
          sx={{
            bg: "$backgroundLight300",
            display: "flex",
            _dark: {
              bg: "$backgroundDark800",
            },
            "@base": {
              display: "none",
            },
          }}
        />
        <VStack
          alignItems="center"
          justifyContent="center"
          sx={{
            pt: "$2",
            "@base": {
              flex: 1,
              pt: "$0",
            },
          }}
        >
          <Heading size="xs" fontFamily="$heading">
            {data}
          </Heading>
          <Text size="xs">Events</Text>
        </VStack>
      </Box>
      <Box
        mb="$5"
        sx={{
          flexDirection: "column",
          "@base": {
            mb: "$6",
            flexDirection: "row",
          },
        }}
      >
        <Image
          mb="$3"
          borderRadius="$md"
          sx={{
            width: "$full",
            height: 140,

            "@base": {
              mb: "$0",
              mr: "$3",
              width: 150,
              height: 154,
            },
          }}
          source={{
            uri: "https://images.unsplash.com/photo-1592089416462-2b0cb7da8379?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          alt="image1"
        />
        <Image
          borderRadius="$md"
          sx={{
            width: "$full",
            height: 140,
            "@base": {
              width: 150,
              height: 154,
            },
          }}
          source={{
            uri: "https://images.unsplash.com/photo-1484406566174-9da000fda645?q=80&w=2425&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          alt="image2"
        />
      </Box>
      <Button py="$2" px="$4">
        <ButtonText size="sm">Join</ButtonText>
      </Button>
    </Card>
  );
}

export default Cards;
