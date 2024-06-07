import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
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
import { ArrowLeftIcon } from "react-native-heroicons/solid";

const Announcements = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [annoucements, setAnnouncements] = useState([]);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [operation, setOperation] = useState(false);

  const updateAnnouncement = async () => {
    console.log("Updating announcement");
  };

  const addAnnouncement = async () => {
    if (title.length > 0 && body.length > 0 && url.length === 0) {
      await supabase.from("announcements").insert([{ title, body }]);
    }

    if (title.length > 0 && body.length > 0 && url.length > 0) {
      await supabase.from("announcements").insert([{ title, body, url }]);
    }
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
      <View className="flex flex-row justify-between px-4 items-center">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="bg-tblack p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-4 w-9"
              style={{backgroundColor:"black"}}
            >
              <ArrowLeftIcon size="20" color="white" />
            </TouchableOpacity>
          </View>
      <View
        style={{
          paddingLeft: "7%",
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
      <View style={{ padding: 24 }}>
        <Button
          size="md"
          variant="solid"
          action="primary"
          isDisabled={operation}
          isFocusVisible={false}
          onPress={() => {
            navigation.navigate("CreateAnnouncements");
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
