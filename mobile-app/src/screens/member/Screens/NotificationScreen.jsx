import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  StyleSheet,
  useColorScheme,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../../admin/Components/Header";

export default function NotificationPreferencesScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [notifications, setNotifications] = useState({
    classReminders: true,
    attendanceUpdates: true,
    announcementAlerts: false,
    gradeUpdates: true,
  });

  const toggleSwitch = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const notificationList = [
    {
      key: "classReminders",
      title: "Class Reminders",
      description: "Get notified 15 minutes before your class starts.",
      icon: "schedule",
    },
    {
      key: "attendanceUpdates",
      title: "Attendance Updates",
      description: "Receive updates when your attendance status is marked.",
      icon: "check-circle",
    },
    {
      key: "announcementAlerts",
      title: "Announcement Alerts",
      description:
        "Stay informed about important university or course announcements.",
      icon: "campaign",
    },
    {
      key: "gradeUpdates",
      title: "Grade Updates",
      description: "Get alerts when a new grade is posted.",
      icon: "grading",
    },
  ];

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#101822" : "#f6f7f8" },
      ]}
    >
      {/* Header */}
     <Header titleHeader="Notification Preferences" />

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark ? "#1a2431" : "#fff",
              shadowColor: isDark ? "#000" : "#000",
            },
          ]}
        >
          {notificationList.map((item, index) => (
            <View key={item.key}>
              <View style={styles.itemRow}>
                <View style={styles.itemLeft}>
                  <View
                    style={[
                      styles.iconContainer,
                      { backgroundColor: "rgba(19,109,236,0.2)" },
                    ]}
                  >
                    <MaterialIcons
                      name={item.icon}
                      size={24}
                      color="#136dec"
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text
                      style={[
                        styles.itemTitle,
                        { color: isDark ? "#fff" : "#111418" },
                      ]}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={[
                        styles.itemDescription,
                        { color: isDark ? "#9ca3af" : "#617289" },
                      ]}
                    >
                      {item.description}
                    </Text>
                  </View>
                </View>
                <Switch
                  trackColor={{ false: "#ccc", true: "#136dec" }}
                  thumbColor={"#fff"}
                  ios_backgroundColor="#ccc"
                  onValueChange={() => toggleSwitch(item.key)}
                  value={notifications[item.key]}
                />
              </View>

              {index !== notificationList.length - 1 && (
                <View
                  style={[
                    styles.divider,
                    { backgroundColor: isDark ? "#1e293b" : "#e5e7eb" },
                  ]}
                />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Lexend",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 28,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    overflow: "hidden",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemDescription: {
    fontSize: 13,
    lineHeight: 18,
    marginTop: 2,
  },
  divider: {
    height: 1,
    marginLeft: 76,
  },
});
