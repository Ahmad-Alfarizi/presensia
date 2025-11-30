import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../constants/colors";

export default function StatCard({ icon, title, value, color }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper(color)}>
        <MaterialIcons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  iconWrapper: (color) => ({
    backgroundColor: `${color}20`,
    borderRadius: 8,
    padding: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  }),
  title: {
    fontSize: 12,
    color: "#6C757D",
    marginBottom: 6,
    fontWeight: '500',
  },
  value: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111418",
  },
});
