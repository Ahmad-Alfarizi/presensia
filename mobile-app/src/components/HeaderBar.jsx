import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function HeaderBar({ onSkip }) {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.skipText} onPress={onSkip}>
        Skip
      </Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "end",
    alignItems: "left",
    paddingHorizontal: 16,
    paddingVertical: 30,
  },
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: "end",
  },
  skipText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
  },
});
