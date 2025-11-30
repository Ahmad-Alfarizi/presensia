import React, { useColorScheme } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme as useColorSchemeHook,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../Components/Header";

export default function GettingStarted({ route }) {
  const navigation = useNavigation();
  const colorScheme = useColorSchemeHook();
  const isDark = colorScheme === "dark";
  const title = route?.params?.title || "Getting Started";

  const sections = [
    {
      id: "intro",
      title: "Welcome to Admin Dashboard",
      content:
        "This guide will help you get started with the admin dashboard. You'll learn how to set up your account, navigate the interface, and perform basic tasks.",
    },
    {
      id: "account-setup",
      title: "Setting Up Your Account",
      content:
        "1. Log in with your credentials\n2. Navigate to Account Settings\n3. Update your profile information\n4. Set your preferences\n5. Configure notification settings",
    },
    {
      id: "navigation",
      title: "Navigation Basics",
      content:
        "• Dashboard: View overview and key metrics\n• Users: Manage students and lecturers\n• Courses: Create and manage courses\n• Attendance: Track attendance records\n• Reports: Generate and export reports\n• Settings: Manage your account preferences",
    },
    {
      id: "first-steps",
      title: "Your First Steps",
      content:
        "1. Complete your profile setup\n2. Add courses to the system\n3. Invite users to your organization\n4. Set up attendance rules\n5. Start monitoring attendance",
    },
    {
      id: "tips",
      title: "Tips & Tricks",
      content:
        "• Use keyboard shortcuts for faster navigation\n• Enable dark mode for comfortable viewing\n• Set up 2-factor authentication for security\n• Regularly backup your data\n• Check the User Guide for detailed help",
    },
  ];

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#101822" : "#F7F8FA" },
      ]}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: isDark ? "#1A2532" : "#FFFFFF" },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={isDark ? "#E5E7EB" : "#333"}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? "#E5E7EB" : "#333" }]}>
          {title}
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {sections.map((section) => (
          <View
            key={section.id}
            style={[
              styles.section,
              { backgroundColor: isDark ? "#1A2532" : "#FFFFFF" },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: isDark ? "#E5E7EB" : "#333" }]}>
              {section.title}
            </Text>
            <Text style={[styles.sectionContent, { color: isDark ? "#9CA3AF" : "#666" }]}>
              {section.content}
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", flex: 1, textAlign: "center" },
  content: { flex: 1 },
  contentContainer: { padding: 16 },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  sectionTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  sectionContent: { fontSize: 14, lineHeight: 22 },
});
