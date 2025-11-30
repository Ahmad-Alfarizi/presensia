import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ManagementCard({ icon, title, subtitle }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <MaterialIcons name={icon} size={24} color="#4A90E2" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <MaterialIcons name="arrow-forward-ios" size={18} color="#94a3b8" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dbe0e6",
    marginBottom: 10,
  },
  iconBox: {
    backgroundColor: "#4A90E220",
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111418",
  },
  subtitle: {
    fontSize: 13,
    color: "#617289",
  },
});
