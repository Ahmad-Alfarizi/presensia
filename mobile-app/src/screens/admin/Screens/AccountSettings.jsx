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

export default function AccountSettings({ route }) {
  const navigation = useNavigation();
  const colorScheme = useColorSchemeHook();
  const isDark = colorScheme === "dark";
  const title = route?.params?.title || "Account Settings";

  const sections = [
    {
      id: "profile",
      title: "Managing Your Profile",
      content:
        "1. Go to Settings > Profile\n2. Edit personal information:\n   • Full name\n   • Email address\n   • Phone number\n   • Profile picture\n3. Update bio and department\n4. Save changes",
    },
    {
      id: "password",
      title: "Changing Your Password",
      content:
        "1. Navigate to Settings > Security\n2. Click 'Change Password'\n3. Enter current password\n4. Create new secure password (min 8 chars)\n5. Confirm new password\n6. Save and re-login if needed",
    },
    {
      id: "notifications",
      title: "Notification Settings",
      content:
        "Customize notifications for:\n• Attendance changes\n• User registration\n• Course updates\n• System alerts\n• Email frequency preferences\n• Push notification toggles",
    },
    {
      id: "security",
      title: "Security Settings",
      content:
        "Enhanced security features:\n• Two-factor authentication (2FA)\n• Login activity logs\n• Active sessions management\n• Device security\n• IP whitelist configuration\n• Account recovery options",
    },
    {
      id: "privacy",
      title: "Privacy & Data",
      content:
        "Control your data:\n• Data visibility settings\n• Export personal data\n• Activity tracking preferences\n• Third-party integrations\n• Cookie management\n• Data retention policies",
    },
    {
      id: "organization",
      title: "Organization Settings",
      content:
        "Admin-only settings:\n• Organization name and logo\n• Contact information\n• System preferences\n• User role management\n• API key generation\n• Integration settings",
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
