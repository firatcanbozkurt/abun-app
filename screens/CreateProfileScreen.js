import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Pressable,
  Platform,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";

const departments = ["Department A", "Department B", "Department C"];

export default function CreateProfileScreen() {
  const faculties = [
    {
      id: 1,
      name: "Engineering Faculty",
      departments: [
        "Computer Engineering",
        "Software Engineering",
        "Electrical Engineering",
      ],
    },
    {
      id: 2,
      name: "Faculty of Fine Arts and Design",
      departments: ["Graphic Design", "Industrial Design", "Fine Arts"],
    },
    {
      id: 3,
      name: "Faculty of Law",
      departments: ["Criminal Law", "Corporate Law", "International Law"],
    },
    {
      id: 4,
      name: "Faculty of Humanities and Social Sciences",
      departments: ["Psychology", "Sociology", "History"],
    },
  ];
  const navigation = useNavigation();

  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showFacultyPicker, setFacultyShowPicker] = useState(false);

  const toggleFacultyPicker = () => {
    setFacultyShowPicker(!showFacultyPicker);
  };

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };
  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatepicker();
        setDateOfBirth(formatDate(currentDate));
      }
    } else {
      toggleDatepicker();
    }
  };

  const confirmIOSDate = () => {
    setDateOfBirth(formatDate(date));
    toggleDatepicker();
  };
  const formatDate = (rawDate) => {
    let date = new Date(rawDate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${day}-${month}-${year}`;
  };

  const handleFacultySelection = (faculty) => {
    setSelectedFaculty(faculty);
    setSelectedDepartment("");
  };
  const completeProfile = async () => {
    console.log(selectedFaculty.name);

    try {
      const docRef = await addDoc(collection(db, "users"), {
        fullName: fullName,
        dateOfBirth: dateOfBirth,
        faculty: selectedFaculty.name,
        department: selectedDepartment,
        email: auth.currentUser.email,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <View className="flex-1 bg-primary ">
      <SafeAreaView className="flex">
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-secondary p-2 rounded-tr-2xl rounded-bl-2xl ml-4 mt-4"
          >
            <ArrowLeftIcon size="20" color="white" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center mb-4">
          <Image
            source={require("../assets/ProfileSettings.png")}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </SafeAreaView>

      <View
        className="flex-1 bg-twhite px-8 pt-8"
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Full Name</Text>
          <View className="flex">
            <TextInput
              className="p-4 bg-gray-200 text-gray-900 rounded-2xl mb-3"
              value={fullName}
              onChangeText={(text) => setFullName(text)}
              placeholder="Full Name"
              placeholderTextColor={"#718096"}
            />
          </View>
        </View>

        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Birth Date</Text>
          <View className="flex">
            {showPicker && (
              <DateTimePicker
                mode="date"
                display="spinner"
                value={date}
                onChange={onChange}
                className="h-120 mt-[-10]"
                maximumDate={new Date("2005-1-1")}
              />
            )}
            {showPicker && Platform.OS === "ios" && (
              <View className="flex-row justify-around">
                <TouchableOpacity onPress={toggleDatepicker} className="">
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmIOSDate} className="">
                  <Text>Confirm</Text>
                </TouchableOpacity>
              </View>
            )}

            {!showPicker && (
              <Pressable onPress={toggleDatepicker}>
                <TextInput
                  className="p-4 bg-gray-200 text-gray-900 rounded-2xl mb-3"
                  value={dateOfBirth}
                  onChangeText={() => setDateOfBirth(dateOfBirth)}
                  placeholder="Date of Birth"
                  placeholderTextColor={"#718096"}
                  editable={false}
                  onPressIn={toggleDatepicker}
                />
              </Pressable>
            )}
          </View>

          {/* Faculty Select Part */}

          <View className="form space-y-2 mb-1">
            <Text className="text-gray-700 ml-4">Faculty</Text>
            <View
              style={{
                borderRadius: 12,
                borderColor: "#bdc3c7",
                overflow: "hidden",
              }}
            >
              <RNPickerSelect
                key={1}
                value={selectedFaculty?.id}
                placeholder="asdfasd"
                onValueChange={(itemValue) =>
                  handleFacultySelection(
                    faculties.find((faculty) => faculty.id === itemValue)
                  )
                }
                items={[
                  ...faculties.map((faculty) => ({
                    label: faculty.name,
                    value: faculty.id,
                    key: faculty.id.toString(),
                  })),
                ]}
                style={{
                  inputIOS: {
                    backgroundColor: "#edf2f7",
                    color: "#4a5568",
                    height: 40,
                    paddingHorizontal: 10,
                    marginBottom: 0,
                  },
                  inputAndroid: {
                    backgroundColor: "#edf2f7",
                    color: "#4a5568",
                    height: 40,
                    paddingHorizontal: 10,
                    marginBottom: 10,
                  },
                }}
                placeholderTextColor="#4a5568"
                mode="dropdown"
              />
            </View>
          </View>

          {/* Departmant Select Part */}
          {/* Departmant Select Part */}
          {selectedFaculty && (
            <View className="form space-y-2">
              <Text className="text-gray-700 ml-4">Department</Text>
              <View
                style={{
                  borderRadius: 12,
                  borderColor: "#bdc3c7",
                  overflow: "hidden",
                }}
              >
                <RNPickerSelect
                  value={selectedDepartment}
                  onValueChange={(itemValue) =>
                    setSelectedDepartment(itemValue)
                  }
                  items={[
                    { label: "Select Department", value: "" },
                    ...(selectedFaculty.departments || []).map(
                      (department, index) => ({
                        key: index,
                        label: department,
                        value: department,
                      })
                    ),
                  ]}
                  style={{
                    inputIOS: {
                      backgroundColor: "#edf2f7",
                      color: "#4a5568",
                      height: 40,
                      paddingHorizontal: 10,
                      marginBottom: 0,
                    },
                    inputAndroid: {
                      backgroundColor: "#edf2f7",
                      color: "#4a5568",
                      height: 40,
                      paddingHorizontal: 10,
                      marginBottom: 0,
                    },
                  }}
                  placeholderTextColor="#4a5568"
                  mode="dropdown"
                />
              </View>
            </View>
          )}
        </View>
        <View className="flex-1" />
        <View className="flex mb-8">
          <TouchableOpacity
            onPress={completeProfile}
            style={{
              backgroundColor: "#B52FF8",
              paddingVertical: 15,
              borderRadius: 20,
            }}
          >
            <Text className="font-xl font-bold text-center text-twhite">
              Complete Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
