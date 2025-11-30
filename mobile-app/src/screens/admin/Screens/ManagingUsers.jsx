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

export default function ManagingUsers({ route }) {
  const navigation = useNavigation();
  const colorScheme = useColorSchemeHook();
  const isDark = colorScheme === "dark";
  const title = route?.params?.title || "Managing Users";

  const sections = [
    {
      id: "overview",
      title: "User Management Overview",
      content:
        "The user management system allows you to add, edit, and remove students and lecturers from your organization. You can assign roles, track user activity, and manage permissions.",
    },
    {
      id: "add-students",
      title: "Adding Students",
      content:
        "1. Go to Users > Students\n2. Click the 'Add Student' button\n3. Enter student details (name, email, ID)\n4. Assign to courses\n5. Send invitation\n6. Student will receive activation link",
    },
    {
      id: "add-lecturers",
      title: "Adding Lecturers",
      content:
        "1. Go to Users > Lecturers\n2. Click 'Add Lecturer' button\n3. Enter lecturer information\n4. Set department and subjects\n5. Configure permissions\n6. Send welcome email",
    },
    {
      id: "edit-users",
      title: "Editing User Information",
      content:
        "• Click on any user to view their profile\n• Edit basic information: name, email, contact\n• Update assigned courses\n• Change user role or permissions\n• Save changes to apply updates",
    },
    {
      id: "remove-users",
      title: "Removing Users",
      content:
        "1. Select the user you want to remove\n2. Click 'More Options' > 'Remove User'\n3. Confirm the action\n4. Choose to archive or delete records\n5. User will lose access immediately",
    },
    {
      id: "bulk-operations",
      title: "Bulk Operations",
      content:
        "• Import multiple users via CSV file\n• Export user list for backup\n• Bulk assign users to courses\n• Send mass notifications\n• Perform bulk role updates",
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
