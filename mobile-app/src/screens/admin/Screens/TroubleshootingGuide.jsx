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

export default function TroubleshootingGuide({ route }) {
  const navigation = useNavigation();
  const colorScheme = useColorSchemeHook();
  const isDark = colorScheme === "dark";
  const title = route?.params?.title || "Troubleshooting";

  const sections = [
    {
      id: "login",
      title: "Login Issues",
      content:
        "Problem: Can't login\nSolutions:\n• Check internet connection\n• Verify correct email/username\n• Reset password via 'Forgot Password'\n• Clear browser cache/app cache\n• Try incognito/private mode\n• Check account status in admin panel",
    },
    {
      id: "performance",
      title: "Performance Issues",
      content:
        "Problem: App runs slowly\nSolutions:\n• Close other apps running\n• Clear app cache (Settings > App Info)\n• Update app to latest version\n• Check available storage space\n• Reduce number of open tabs\n• Restart device",
    },
    {
      id: "attendance",
      title: "Attendance Problems",
      content:
        "QR Code not working:\n• Check camera permissions\n• Ensure good lighting\n• Clear QR code display\n\nRecords not saving:\n• Check internet connection\n• Verify sufficient permissions\n• Try manual entry\n• Check system notifications",
    },
    {
      id: "sync",
      title: "Synchronization Issues",
      content:
        "Data not syncing:\n1. Check internet connectivity\n2. Verify account authentication\n3. Force sync: Settings > Sync Now\n4. Check last sync time\n5. Restart app\n6. Clear cache and reload",
    },
    {
      id: "reports",
      title: "Report Generation Issues",
      content:
        "Report won't generate:\n• Check data availability for date range\n• Verify read permissions\n• Try different format\n• Check storage space for export\n• Reduce date range\n• Contact IT support",
    },
    {
      id: "contact",
      title: "Still Need Help?",
      content:
        "Additional resources:\n• Visit Help & Support section\n• Contact system administrator\n• Email: support@example.com\n• Phone: +1-XXX-XXX-XXXX\n• Live chat: Available 9AM-5PM\n• Submit bug report in app",
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
