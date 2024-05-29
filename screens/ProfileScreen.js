import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { useFonts } from "expo-font";
import { useAuth } from "../components/context/AuthProvider";
const ProfileScreen = () => {
  const [text, setText] = useState("");
  const navigation = useNavigation();
  const { session, loading } = useAuth();
  console.log(session)

  const [fontsLoaded, fontError] = useFonts({
    Montserrat: require("../assets/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <Ionicons
            name="ios-arrow-back"
            size={24}
            color="#52575D"
            onPress={() => navigation.navigate("Home")}
          ></Ionicons>
          <Feather name="more-vertical" size={24} color="#52575D" />
        </View>

        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={require("../assets/profile.jpg")}
              style={styles.image}
              resizeMode="center"
            ></Image>
          </View>
          <View style={styles.add}>
            <Ionicons
              name="ios-add"
              size={48}
              color="#DFD8C8"
              style={{ marginTop: 6, marginLeft: 2 }}
            ></Ionicons>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <Text
            style={[
              styles.text,
              { fontWeight: 200, fontSize: 37, marginTop: 16 },
            ]}
          >
          </Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
            Software Engineering
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>4</Text>
            <Text style={[styles.text, styles.subText]}>Class</Text>
          </View>
          <View
            style={[
              styles.statsBox,
              {
                borderColor: "#DFD8C8",
                borderLeftWidth: 1,
                borderRightWidth: 1,
              },
            ]}
          >
            <Text style={[styles.text, { fontSize: 24 }]}>8</Text>
            <Text style={[styles.text, styles.subText]}>Events</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>11</Text>
            <Text style={[styles.text, styles.subText]}>Events</Text>
          </View>
        </View>
        <View style={{ marginTop: 32 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require("../assets/ann.jpeg")}
                style={styles.image}
                resizeMode="cover"
              ></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require("../assets/ann.jpeg")}
                style={styles.image}
                resizeMode="cover"
              ></Image>
            </View>
            <View style={styles.mediaImageContainer}>
              <Image
                source={require("../assets/ann.jpeg")}
                style={styles.image}
                resizeMode="cover"
              ></Image>
            </View>
          </ScrollView>
          <View style={styles.mediaCount}>
            <Text
              style={[
                styles.text,
                { fontSize: 24, color: "#DFD8C8", fontWeight: "300" },
              ]}
            >
              70
            </Text>
            <Text
              style={[
                styles.text,
                { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" },
              ]}
            >
              Media
            </Text>
          </View>
        </View>
        <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>
        <View style={{ alignItems: "center" }}>
          <View style={styles.recentItem}>
            <View style={styles.recentItemIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#414448", fontWeight: 400 }]}
              >
                Started Following
                <Text style={{ fontWeight: "400" }}>
                  Jake Challeahe and{" "}
                  <Text style={{ fontWeight: "400" }}> DesignIntoCode</Text>
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.recentItem}>
            <View style={styles.recentItemIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#414448", fontWeight: 400 }]}
              >
                Started Following
                <Text style={{ fontWeight: "400" }}>
                  Jake Challeahe and{" "}
                  <Text style={{ fontWeight: "400" }}> DesignIntoCode</Text>
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.recentItem}>
            <View style={styles.recentItemIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#414448", fontWeight: 400 }]}
              >
                Started Following
                <Text style={{ fontWeight: "400" }}>
                  Jake Challeahe and{" "}
                  <Text style={{ fontWeight: "400" }}> DesignIntoCode</Text>
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.recentItem}>
            <View style={styles.recentItemIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#414448", fontWeight: 400 }]}
              >
                Started Following
                <Text style={{ fontWeight: "400" }}>
                  Jake Challeahe and{" "}
                  <Text style={{ fontWeight: "400" }}> DesignIntoCode</Text>
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.recentItem}>
            <View style={styles.recentItemIndicator}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#414448", fontWeight: 400 }]}
              >
                Started Following
                <Text style={{ fontWeight: "400" }}>
                  Jake Challeahe and{" "}
                  <Text style={{ fontWeight: "400" }}> DesignIntoCode</Text>
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    fontFamily: "",
    //color: "#52575D",
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },

  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    margintop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0,0,0,0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  recentItemIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
  input: {
    width: "75%",
    height: 40,
    borderColor: "#DEE1EF",
    borderBottomWidth: 2,
    borderRadius: 4,
    padding: 3,
    marginTop: 5,
    marginBottom: 5,
  },
  customButton: {},
});

export default ProfileScreen;

// <SafeAreaView style={styles.container}>
// <View style={{ flex: 1 }}>
//   <View className="pl-4 pt-4">
//     <AntDesign name="arrowleft" size={24} color="black" className="" />
//   </View>
//   <View style={{ left: 25, marginTop: 50 }}>
//     <Text style={{ fontSize: 46, fontWeight: "bold" }}>Profile</Text>
//     <View style={{ flexDirection: "row", marginTop: 35, left: -10 }}>
//       <Ionicons
//         name="person-circle-outline"
//         size={64}
//         color="black"
//         style={{}}
//       />
//       <View style={{ marginLeft: 10, gap: 3 }}>
//         <Text style={{ fontSize: 22, color: "#2743FD" }}>
//           Emma Ashley
//         </Text>
//         <Text style={{ fontSize: 18, color: "#2743FD" }}>Online</Text>
//       </View>
//     </View>

//     <View style={{ marginTop: 35 }}>
//       <View>
//         <Text style={{ fontSize: 20 }}>Username</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Epidemic"
//           placeholderTextColor="#2743FD"
//           onChangeText={(inputText) => setText(inputText)}
//           value={Text}
//         />
//       </View>
//       <View>
//         <Text style={{ fontSize: 20 }}>First Name</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Halid"
//           placeholderTextColor="#2743FD"
//         />
//       </View>
//       <View>
//         <Text style={{ fontSize: 20 }}>Last Name</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Acar"
//           placeholderTextColor="#2743FD"
//         />
//       </View>
//       <View>
//         <Text style={{ fontSize: 20 }}>Date of Birth</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="04.02.1997"
//           placeholderTextColor="#2743FD"
//         />
//       </View>
//     </View>
//   </View>
//   <Button
//     title="Start Discover!"
//     style={{
//       justifyContent: "center",
//       alignSelf: "center",
//       marginTop: 20,
//     }}
//     onPress={() => useNavigation.navigate("Home")}
//   />

//   <Footer />
// </View>
// </SafeAreaView>
// );
