import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function MetricCard({ icon, label, value, color }) {
  return (
    <View style={styles.card}>
      <MaterialIcons name={icon} size={24} color={color || "#4A90E2"} />
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: color || "#111418" }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#dbe0e6",
  },
  label: {
    color: "#617289",
    fontSize: 14,
    marginTop: 6,
  },
  value: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 4,
  },
});
