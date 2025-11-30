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

export default function GeneratingReports({ route }) {
  const navigation = useNavigation();
  const colorScheme = useColorSchemeHook();
  const isDark = colorScheme === "dark";
  const title = route?.params?.title || "Generating Reports";

  const sections = [
    {
      id: "overview",
      title: "Reports Overview",
      content:
        "Generate comprehensive reports on attendance, user activity, and course performance. Export data in multiple formats for analysis and documentation.",
    },
    {
      id: "attendance-reports",
      title: "Attendance Reports",
      content:
        "1. Go to Reports > Attendance\n2. Select report type:\n   • Student attendance summary\n   • Course attendance overview\n   • Individual attendance history\n3. Choose date range\n4. Select format (PDF, Excel, CSV)\n5. Download or email report",
    },
    {
      id: "performance-reports",
      title: "Performance Reports",
      content:
        "View metrics including:\n• Attendance rates by student\n• Course-wise attendance statistics\n• Lecturer performance metrics\n• Enrollment trends\n• System usage analytics\n• User activity logs",
    },
    {
      id: "custom-reports",
      title: "Creating Custom Reports",
      content:
        "1. Click 'Create Custom Report'\n2. Select data sources\n3. Choose metrics to include\n4. Add filters (date, course, user)\n5. Configure visualization\n6. Save and schedule reports",
    },
    {
      id: "export-data",
      title: "Exporting Data",
      content:
        "Export formats available:\n• PDF - Professional formatted reports\n• Excel - Spreadsheet with charts\n• CSV - Raw data for analysis\n• JSON - For system integration\n\nBulk export options:\n• Multiple courses\n• Date ranges\n• Filtered data",
    },
    {
      id: "scheduled-reports",
      title: "Scheduled Reports",
      content:
        "Automate reporting:\n1. Set up recurring reports\n2. Choose frequency (daily/weekly/monthly)\n3. Select recipients\n4. Set preferred format\n5. Reports auto-deliver to email\n6. View schedule history",
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
