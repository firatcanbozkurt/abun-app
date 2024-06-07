import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";
import {
  Button,
  ButtonIcon,
  ButtonText,
  Card,
  CloseIcon,
  EditIcon,
  Heading,
  Spinner,
  Textarea,
  TextareaInput,
  Input,
  InputField,
  FabLabel,
  Icon,
  MessageCircleIcon,
} from "@gluestack-ui/themed";

const Announcements = ({ navigation, route }) => {
  //const {id, , title} = route.params;
  const [title, setTitle] = useState("");
  const [annoucements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [operation, setOperation] = useState(false);

  const updateAnnouncement = async () => {
    console.log("Updating announcement");
  };

  const navigateCreateAnnouncement = () => {
    navigation.navigate("CreateAnnouncements", {
      onGoBack: (data) => fetchAnnouncements(),
    });
  };

  const deleteAnnouncement = async (id) => {
    setOperation(true);
    await supabase
      .from("announcements")
      .delete()
      .eq("id", id)
      .then(() => {
        setAnnouncements((prev) => prev.filter((item) => item.id !== id));
        setOperation(false);
      });
  };
  const fetchAnnouncements = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("announcements").select("*");
    if (error) {
      alert("Error fethching announcements");
    }
    setAnnouncements(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          paddingLeft: "5%",
          paddingTop: "5%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>Announcements</Text>
      </View>
      <View style={{ marginHorizontal: "5%", marginTop: "5%" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        ></View>
        <View // Horizontal line
          style={{
            width: "100%",
            borderBottomColor: "#B8B9BC",
            opacity: 0.5,
            borderBottomWidth: 1.5,
            alignSelf: "center",
            marginTop: 10,
          }}
        />
      </View>
      <View style={{ padding: 16 }}>
        <Button
          size="md"
          variant="solid"
          action="primary"
          isDisabled={operation}
          isFocusVisible={false}
          onPress={() => {
            navigateCreateAnnouncement();
          }}
        >
          <ButtonText>Create Announcement</ButtonText>
        </Button>
      </View>
      <View>
        {isLoading ? (
          <Spinner size="large" />
        ) : (
          <>
            {annoucements.length === 0 && (
              <View
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ padding: 16, fontSize: 24 }}>
                  No announcements found!
                </Text>
              </View>
            )}
            <FlatList
              data={annoucements}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View>
                  <Card size="md" variant="elevated" m="$3">
                    <Heading mb="$1" size="md">
                      {item.title}
                    </Heading>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        size="md"
                        variant="solid"
                        action="primary"
                        isDisabled={operation}
                        isFocusVisible={false}
                        onPress={() => {
                          updateAnnouncement();
                        }}
                      >
                        <ButtonIcon as={EditIcon} />
                      </Button>
                      <Button
                        size="md"
                        variant="solid"
                        action="negative"
                        isDisabled={operation}
                        isFocusVisible={false}
                        onPress={() => deleteAnnouncement(item.id)}
                      >
                        <ButtonIcon as={CloseIcon} />
                      </Button>
                    </View>
                  </Card>
                </View>
              )}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Announcements;
