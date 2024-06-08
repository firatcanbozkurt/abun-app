import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogBody,
  ButtonText,
  Button,
  ButtonGroup,
  useToast,
  Toast,
  VStack,
  ToastTitle,
  ToastDescription,
} from "@gluestack-ui/themed";
import LottieView from "lottie-react-native";
import loadingAnimation from "../assets/loading.json";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

const VocabularyListScreen = ({navigation}) => {
  const [vocabularyData, setVocabularyData] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("vocabularyData");
        console.log("Retrieved JSON:", jsonValue);
        if (jsonValue !== null) {
          const data = JSON.parse(jsonValue);
          if (Array.isArray(data)) {
            const sortedData = data.sort((a, b) =>
              (a.word || "").localeCompare(b.word || "")
            );
            setVocabularyData(sortedData);
          } else {
            console.error("Fetched data is not an array:", data);
          }
        } else {
          console.log("No data found in AsyncStorage.");
          setVocabularyData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const deleteWord = async (word) => {
    setSelectedWord(word); 
    setDeleteDialogVisible(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      const updatedData = vocabularyData.filter(
        (item) => item.word !== selectedWord
      );
      await AsyncStorage.setItem("vocabularyData", JSON.stringify(updatedData));
      setVocabularyData(updatedData);
      setDeleteDialogVisible(false);
      toast.show({
        placement: "top",
        render: ({ id }) => {
          const toastId = "toast-" + id;
          return (
            <Toast nativeID={toastId} action="success" variant="accent">
              <VStack space="xs">
                <ToastTitle>
                  {selectedWord} kelimesi başarıyla silindi.
                </ToastTitle>
                <ToastDescription></ToastDescription>
              </VStack>
            </Toast>
          );
        },
      });
    } catch (error) {
      console.error("Kelime silme hatası:", error);
      alert("Kelime silme hatası!");
    }
  };

  const refreshScreen = () => {
    setVocabularyData([...vocabularyData]);
    toast.show({
      placement: "top",
      render: ({ id }) => {
        const toastId = "toast-" + id;
        return (
          <Toast nativeID={toastId} action="success" variant="accent">
            <VStack space="xs">
              <ToastTitle>Sayfa yenilendi</ToastTitle>
            </VStack>
          </Toast>
        );
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View className="justify-center items-center mr-2">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="bg-tblack p-2 rounded-full w-9"
              style={{backgroundColor:"black"}}
            >
              <ArrowLeftIcon size="20" color="white" />
            </TouchableOpacity>
            </View>
      <Text style={styles.title}>Vocabulary Words</Text>
      <TouchableOpacity onPress={refreshScreen} style={styles.refreshButton}>
        <MaterialIcons name="refresh" size={32} color="blue" />
      </TouchableOpacity>
      </View>
      <FlatList
        data={vocabularyData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View key={item.word} style={styles.card}>
            <View style={styles.cardContent}>
              <Text style={styles.word}>
                <Text style={styles.wordBold}>{item.word}:</Text>{" "}
                {item.description}
              </Text>
              <TouchableOpacity onPress={() => deleteWord(item.word)}>
                <MaterialIcons name="delete" size={28} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <AlertDialog
        isOpen={deleteDialogVisible}
        onClose={() => setDeleteDialogVisible(false)}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Text>Confirm Deletion</Text>
            <AlertDialogCloseButton />
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text>Are you sure you want to delete this word?</Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => setDeleteDialogVisible(false)}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                bg="$red600"
                action="negative"
                onPress={handleDeleteConfirmation}
              >
                <ButtonText>Delete</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f7",
  },
  header: {
    flexDirection: "row",
    justifyContent:"center",

    display:"space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 25,

  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  word: {
    fontSize: 18,
    flex: 1,
    flexWrap: "wrap",
  },
  wordBold: {
    fontWeight: "bold",
  },
});

export default VocabularyListScreen;
