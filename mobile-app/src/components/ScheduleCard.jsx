import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../constants/colors";

export default function ScheduleCard({ icon, title, lecturer, room, time }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons name={icon} size={24} color={colors.primary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.detail}>{room}</Text>
        <Text style={styles.detail}>{lecturer}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: 'flex-start',
    gap: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  iconContainer: {
    backgroundColor: `${colors.primary}15`,
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: "600",
    fontSize: 14,
    color: "#111418",
    marginBottom: 4,
  },
  detail: {
    color: "#6C757D",
    fontSize: 12,
    marginBottom: 2,
  },
  time: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
});