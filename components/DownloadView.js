import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React from "react";

const DownloadView = ({ title, getExamPdf, downloading }) => {
  return (
    <>
      <View style={styles.downloadRow}>
        <View>
          <Text style={styles.textSize}>{title}</Text>
        </View>
        <View>
          <Pressable onPress={getExamPdf} style={{ alignItems: "center" }}>
            {!downloading ? (
              <Image
                source={require("../assets/download.png")} // Image resolution is weak! Change it with another one
                width={32}
                height={32}
              />
            ) : (
              <ActivityIndicator size="small" color="#2B47FC" />
            )}
          </Pressable>
        </View>
      </View>
      <View // Horizontal line
        style={{
          width: "80%",
          borderBottomColor: "#2B47FC",
          opacity: 0.5,
          borderBottomWidth: 1.5,
          alignSelf: "center",
          marginBottom: 16,
        }}
      />
    </>
  );
};

export default DownloadView;

const styles = StyleSheet.create({
  // Delete the unused styles
  textSize: {
    fontFamily: "",
    fontSize: 18,
  },
  downloadRow: {
    marginRight: 8,
    paddingHorizontal: 42,
    paddingVertical: 4,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
