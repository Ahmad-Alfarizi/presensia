import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ActivityItem({ icon, color, title, description, time }) {
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
        <MaterialIcons name={icon} size={20} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{description}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 50,
    marginTop: 3,
  },
  title: {
    fontWeight: "bold",
    color: "#111418",
    fontSize: 15,
  },
  desc: {
    color: "#617289",
    fontSize: 13,
  },
  time: {
    color: "#94a3b8",
    fontSize: 11,
    marginTop: 2,
  },
});
