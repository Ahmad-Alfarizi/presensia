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

export default function AttendanceTracking({ route }) {
  const navigation = useNavigation();
  const colorScheme = useColorSchemeHook();
  const isDark = colorScheme === "dark";
  const title = route?.params?.title || "Attendance Tracking";

  const sections = [
    {
      id: "overview",
      title: "Attendance Tracking Overview",
      content:
        "Monitor and manage student attendance records efficiently. View attendance reports, identify patterns, and take action on absent or irregular students.",
    },
    {
      id: "view-attendance",
      title: "Viewing Attendance Records",
      content:
        "1. Go to Attendance section\n2. Select a course and date range\n3. View attendance grid with status:\n   • Present (✓)\n   • Absent (✗)\n   • Late (⧖)\n4. Filter by status or student\n5. Export records if needed",
    },
    {
      id: "mark-attendance",
      title: "Marking Attendance",
      content:
        "Manual Marking:\n1. Open class session\n2. Tap student to change status\n3. Mark as Present/Absent/Late\n4. Save changes\n\nQR Code:\n1. Display QR code for class\n2. Students scan to mark present\n3. Automatic timestamp recorded",
    },
    {
      id: "edit-records",
      title: "Editing Attendance Records",
      content:
        "1. Select the attendance record to modify\n2. Click on specific entry\n3. Change status or add notes\n4. Update date if needed\n5. Confirm and save changes\n6. Changes are logged in system",
    },
    {
      id: "analytics",
      title: "Attendance Analytics",
      content:
        "• View attendance rates by student\n• Track attendance trends over time\n• Identify frequent absentees\n• Generate attendance certificates\n• Export data for analysis\n• View participation statistics",
    },
    {
      id: "policies",
      title: "Attendance Policies",
      content:
        "Set threshold rules:\n• Minimum attendance percentage required\n• Automatic flags for low attendance\n• Notification for absences\n• Handle medical/excused absences\n• Document absence reasons\n• Track approved leave",
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
