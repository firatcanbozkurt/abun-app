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
import { joinClub, useNumberOfEvents } from "../api/clubs";
import { ActivityIndicator,   Alert} from "react-native";
import { isUserMember } from "../api/clubs";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from "./context/AuthProvider";
import { set } from "date-fns";
function Cards({ name, id, img, body, numberOfEvents, numberOfMembersProp }) {
  const communityId = id;
  // const { data, error, isLoading } = useNumberOfEvents({ id });
  const [joiningClub, setJoiningClub] = useState(false);
  const [numberOfMembers, setNumberOfMembers] = useState(numberOfMembersProp);
  const [isMember, setIsMember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useAuth();
  const userId = session?.user?.id;
  // const { data: isMemberData, isLoading: memberIsLoading } = isUserMember({
  //   id,
  //   userId,
  // });
  // console.log("MEMBER DATA:", isMemberData);
  useEffect(() => {
    setIsLoading(true);
    const checkIfMember = async () => {
      const { data, error } = await supabase
        .from("community_members")
        .select("*")
        .eq("user", userId)
        .eq("community", id);
      if (error) {
        throw new Error(error.message);
      }
      setIsMember(data.length > 0);
      setIsLoading(false);
    };
    checkIfMember();
  }, []);

  if (isLoading /*| memberIsLoading*/) {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
  const joinClubQuery = async () => {
    
    setJoiningClub(true);
    const { data, error } = await supabase
      .from("community_members")
      .insert([{ community: communityId, user: session?.user?.id }]);
    if (error) {
      throw new Error(error.message);
    }

    await supabase // rpc function will be added this is a temporary solution
      .from("communities")
      .update({
        numberOfMembers: numberOfMembers + 1,
      })
      .eq("id", communityId);

    setJoiningClub(false);
    setIsMember(true);
    setNumberOfMembers(numberOfMembers + 1);
    // Check if data exists and if the users array is not null
    return data;
  };

  const leaveClubQuery = async () => {
    setIsMember(false);
    setJoiningClub(true);
    const { data, error } = await supabase
      .from("community_members")
      .delete()
      .eq("community", communityId)
      .eq("user", userId);
    if (error) {
      throw new Error(error.message);
    }
    await supabase // rpc function will be added this is a temporary solution
      .from("communities")
      .update({
        numberOfMembers: numberOfMembers - 1,
      })
      .eq("id", communityId);
    setJoiningClub(false);
    setNumberOfMembers(numberOfMembers - 1);
    // Check if data exists and if the users array is not null
    return data;
  };

  const handleJoinOrLeave = async (actionType) => {
    const confirmed = await confirmAction(actionType);
    if (!confirmed) return; // Kullanıcı işlemi onaylamadıysa, işlemi iptal et
  
    setJoiningClub(true); // İşlem başladı
    if (isMember) {
      await leaveClubQuery();
    } else {
      await joinClubQuery();
    }
  };

  const confirmAction = async (actionType) => {
    let message = "";
    if (actionType === "join") {
      message = "Are you sure you want to join this club?";
    } else if (actionType === "leave") {
      message = "Are you sure you want to leave this club?";
    }
  
    return new Promise((resolve) => {
      Alert.alert(
        `Confirm ${actionType.charAt(0).toUpperCase() + actionType.slice(1)}`,
        message,
        [
          {
            text: "Cancel",
            onPress: () => resolve(false),
            style: "cancel",
          },
          { text: "Confirm", onPress: () => resolve(true) },
        ],
        { cancelable: false }
      );
    });
  };
  
  

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
            {numberOfMembers}
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
            {numberOfEvents}
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
        <Text style={{ fontSize: 15 }}>{body}</Text>
      </Box>
      {isMember ? (
        <Button
          variant="link"
          action="negative"
          onPress={() => handleJoinOrLeave("leave")}
          py="$2"
          px="$4"
        >
          <ButtonText size="sm">Leave</ButtonText>
        </Button>
      ) : joiningClub ? (
        <ActivityIndicator size="small" />
      ) : (
        <Button onPress={() => handleJoinOrLeave("join")}>
          <ButtonText size="sm">Join</ButtonText>
        </Button>
      )}
    </Card>
  );
}
export default Cards;
