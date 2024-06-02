import { View, Text, Pressable, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Octicons } from "@expo/vector-icons";
import confetti from "../assets/confetti.png";
import Cards from "../components/Cards";
import { Avatar } from "@gluestack-ui/themed";
import { ScrollView } from "@gluestack-ui/themed";
import AvatarIcon from "../components/AvatarIcon";
import { useClubList } from "../api/clubs";
import { useEffect } from "react";
import { supabase } from "../supabase";
const Clubs = ({ navigation }) => {
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const { data: clubs, error, isLoading } = useClubList();
  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="p-4">
        <View className="flex flex-row justify-between px-4 items-center">
          <Pressable
            onPress={openDrawer}
            android_ripple={{ color: "transparent" }}
          >
            <Octicons name="three-bars" size={24} color="black" />
          </Pressable>
            <AvatarIcon />
        </View>
        <View className="p-4 mt-12">
          <View className="flex-row justify-center items-center">
            <Text className="text-2xl  mr-1">Discover Communities </Text>
            <Image source={confetti} className="w-7 h-7" />
          </View>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className=" items-center">
          {clubs.map((club) => {
            return (
              <Cards
                name={club?.name}
                key={club?.id}
                id={club?.id}
                img={club?.img_src}
                body={club?.description}
                numberOfEvents={club?.numberOfEvents}
                numberOfMembersProp={club?.numberOfMembers}
              />
            );
          })}
        </View>

        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Clubs;
