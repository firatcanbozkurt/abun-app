import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Button,
  ButtonText,
  Card,
  Divider,
  Heading,
  VStack,
  View,
  Text,
  Box,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
  ButtonGroup,
  Toast,
  ToastTitle,
  ToastDescription,
  useToast,
} from "@gluestack-ui/themed";
import club1 from "../assets/clubIcon1.png";
import { ActivityIndicator, Alert } from "react-native";
import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from "./context/AuthProvider";
function Cards({ name, id, img, body, numberOfEvents, numberOfMembersProp }) {
  const communityId = id;
  // const { data, error, isLoading } = useNumberOfEvents({ id });
  const [joiningClub, setJoiningClub] = useState(false);
  const [numberOfMembers, setNumberOfMembers] = useState(numberOfMembersProp);
  const [isMember, setIsMember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { session } = useAuth();
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const toast = useToast();
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

  if (isLoading ) {
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

    await supabase 
      .from("communities")
      .update({
        numberOfMembers: numberOfMembers + 1,
      })
      .eq("id", communityId);
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="accent">
              <VStack space="xs">
                <ToastTitle>Your registration has succeeded</ToastTitle>
                <ToastDescription>
                  You have joined the club!
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    setJoiningClub(false);
    setIsMember(true);
    setNumberOfMembers(numberOfMembers + 1);
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
    await supabase 
      .from("communities")
      .update({
        numberOfMembers: numberOfMembers - 1,
      })
      .eq("id", communityId);
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="info" sx={{bg:"$purple500"}} variant="accent">
              <VStack space="xs">
                <ToastTitle sx={{color:"$white", fontWeight:"$bold", fontSize:"18"}}>Info</ToastTitle>
                <ToastDescription sx={{color:"$white", fontWeight:"$semibold"}}>
                  We're sorry to see that you've left. Hope to see you at another
                  event soon!"
                </ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    setJoiningClub(false);
    setNumberOfMembers(numberOfMembers - 1);
    return data;
  };

  return (
    <>
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
          <>
            <Button
              variant="link"
              action="negative"
              onPress={() => setShowAlertDialog(true)}
              py="$2"
              px="$4"
            >
              <ButtonText size="sm">Leave</ButtonText>
            </Button>

            <AlertDialog
              isOpen={showAlertDialog}
              onClose={() => {
                setShowAlertDialog(false);
              }}
            >
              <AlertDialogBackdrop />
              <AlertDialogContent>
                <AlertDialogHeader>
                  <Heading size="lg">Are you sure you want to join club?</Heading>
                </AlertDialogHeader>
                <AlertDialogBody>
                  <Text size="sm"></Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                  <ButtonGroup space="lg">
                    <Button
                      variant="outline"
                      action="secondary"
                      onPress={() => {
                        setShowAlertDialog(false);
                      }}
                    >
                      <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button
                      bg="$purple600"
                      action="negative"
                      onPress={() => {
                        leaveClubQuery();
                        setShowAlertDialog(false);
                      }}
                    >
                      <ButtonText>Confirm</ButtonText>
                    </Button>
                  </ButtonGroup>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        ) : joiningClub ? (
          <ActivityIndicator size="small" />
        ) : (
          <>
            <Button onPress={() => setShowAlertDialog(true)}>
              <ButtonText size="sm">Join</ButtonText>
            </Button>
            <AlertDialog
              isOpen={showAlertDialog}
              onClose={() => {
                setShowAlertDialog(false);
              }}
            >
              <AlertDialogBackdrop />
              <AlertDialogContent>
                <AlertDialogHeader>
                  <Heading size="lg">Are you sure you want to join club?</Heading>
                </AlertDialogHeader>
                <AlertDialogBody>
                  <Text size="sm"></Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                  <ButtonGroup space="lg">
                    <Button
                      variant="outline"
                      action="secondary"
                      onPress={() => {
                        setShowAlertDialog(false);
                      }}
                    >
                      <ButtonText>Cancel</ButtonText>
                    </Button>
                    <Button
                      bg="$purple600"
                      action="negative"
                      onPress={() => {
                        joinClubQuery();
                        setShowAlertDialog(false);
                      }}
                    >
                      <ButtonText>Confirm</ButtonText>
                    </Button>
                  </ButtonGroup>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </Card>
    </>
  );
}
export default Cards;
