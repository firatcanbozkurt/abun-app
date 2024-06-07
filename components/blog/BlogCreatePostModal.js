import { View, Text, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  InputField,
  Button,
  ButtonText,
  Input,
  FabLabel,
  Icon,
  EditIcon,
  CircleIcon,
  RadioGroup,
  Radio,
  RadioIndicator,
  RadioIcon,
  RadioLabel,
  Textarea,
  TextareaInput,
  MessageCircleIcon,
} from "@gluestack-ui/themed";
import { supabase } from "../../supabase";
import { useAuth } from "../context/AuthProvider";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

const BlogCreatePostModal = ({ navigation, route }) => {
  const asdfsadf = route.params;
  const { session, profile } = useAuth();
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState("");
  const [body, setBody] = useState("");

  const createPost = async () => {
    if (title === "" || body === "") {
      alert("Please fill all the fields");
      return;
    }

    await supabase
      .from("blog_post")
      .upsert({
        full_name: profile?.full_name,
        title: title,
        tag: tag,
        body: body,
        user_email: session.user.email,
      })
      .select()
      .single()
      .then(({ data, error }) => {
        console.log("AASDASDA", data);
        route.params.onGoBack({
          id: data.id,
          isAdded: true,
          title: data.title,
          tag: data.tag,
          body: data.body,
          uuid: data.id,
          full_name: profile.full_name,
          user_email: session.user.email,
        });

        navigation.goBack();
      });
  };
  return (
    <SafeAreaView className="bg-primary" style={{ flex: 1 }}>
      <View
        style={{
          paddingLeft: "5%",
          paddingTop: "5%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Icon as={EditIcon} m="$2" w="$36" h="$36" />
        <Text style={{ fontSize: 32, fontWeight: "bold" }}>
          Create a blog post
        </Text>
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
        <View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",

              alignItems: "center",
            }}
          >
            <Icon as={EditIcon} m="$2" w="$4" h="$4" />
            <FabLabel
              style={{ color: "black", marginLeft: 2, marginBottom: 2 }}
            >
              Title
            </FabLabel>
          </View>
          <Input
            variant="outline"
            size="md"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <InputField
              onChangeText={(e) => setTitle(e)}
              placeholder="Enter The Title"
            />
          </Input>
        </View>
        <View style={{ marginTop: 16 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",

              alignItems: "center",
            }}
          >
            <Icon as={CircleIcon} m="$2" w="$4" h="$4" />
            <FabLabel
              style={{ color: "black", marginLeft: 2, marginBottom: 2 }}
            >
              Tag
            </FabLabel>
          </View>
          <View style={{ marginHorizontal: 8 }}>
            <RadioGroup
              onChange={setTag}
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Radio
                value="I can help"
                size="md"
                isInvalid={false}
                isDisabled={false}
              >
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} strokeWidth={1} />
                </RadioIndicator>
                <RadioLabel>I can help</RadioLabel>
              </Radio>
              <Radio
                value="Help me"
                size="md"
                isInvalid={false}
                isDisabled={false}
              >
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} strokeWidth={1} />
                </RadioIndicator>
                <RadioLabel>Help me</RadioLabel>
              </Radio>
              <Radio value="" size="md" isInvalid={false} isDisabled={false}>
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} strokeWidth={1} />
                </RadioIndicator>
                <RadioLabel>None</RadioLabel>
              </Radio>
            </RadioGroup>
          </View>
        </View>
        <View style={{ padding: 8, marginTop: 16 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",

              alignItems: "center",
            }}
          >
            <Icon as={MessageCircleIcon} m="$2" w="$4" h="$4" />
            <FabLabel
              style={{ color: "black", marginLeft: 2, marginBottom: 2 }}
            >
              Body
            </FabLabel>
          </View>
          <Textarea
            size="md"
            isReadOnly={false}
            isInvalid={false}
            isDisabled={false}
            w="$full"
            h={200}
          >
            <TextareaInput
              onChangeText={(e) => setBody(e)}
              placeholder="Your text goes here..."
            />
          </Textarea>
        </View>
      </View>

      <SafeAreaView
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button onPress={createPost}>
          <ButtonText size="lg">Add Post</ButtonText>
        </Button>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default BlogCreatePostModal;
