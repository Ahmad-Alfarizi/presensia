import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function FloatingButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <MaterialIcons name="add" size={28} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#4A90E2",
    borderRadius: 30,
    width: 56,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
});
