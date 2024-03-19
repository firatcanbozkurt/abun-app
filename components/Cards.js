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
function Cards({ name, id, img }) {
  const { data, error, isLoading } = useNumberOfEvents({ id });
  {
    /*const {
    data: numberofMembers,
    error: memberError,
    isLoading: memberIsLoading,
  } = useNumberOfEvents({ id }); */
  }
  if (isLoading /*| memberIsLoading*/) {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  return (
    <Card p="$6" borderRadius="$lg" maxWidth={600} m="$3" width={330}>
      <Box flexDirection="row">
        <Avatar mr="$4">
          <AvatarFallbackText fontFamily="$heading">JD</AvatarFallbackText>
          <AvatarImage source={club1} alt="image" />
        </Avatar>
        <VStack>
          <Heading size="sm" fontFamily="$heading" mb="$1">
            {name}
          </Heading>
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
            {"4444"}
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
        <Text style={{ fontSize: 15 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>
      </Box>
      <Button py="$2" px="$4">
        <ButtonText size="sm">Join</ButtonText>
      </Button>
    </Card>
  );
}

export default Cards;
