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

export default function CourseSchedule({ route }) {
  const navigation = useNavigation();
  const colorScheme = useColorSchemeHook();
  const isDark = colorScheme === "dark";
  const title = route?.params?.title || "Course & Schedule Management";

  const sections = [
    {
      id: "overview",
      title: "Course Management Overview",
      content:
        "Create, edit, and organize courses for your institution. Set course schedules, assign lecturers, and manage enrollment to streamline your academic operations.",
    },
    {
      id: "create-course",
      title: "Creating a New Course",
      content:
        "1. Navigate to Courses section\n2. Click 'Create Course' button\n3. Enter course details:\n   • Course code and name\n   • Description\n   • Credits\n   • Semester/Year\n4. Assign a lecturer\n5. Set enrollment capacity\n6. Save course",
    },
    {
      id: "set-schedule",
      title: "Setting Course Schedule",
      content:
        "1. Open a course\n2. Go to Schedule tab\n3. Add class sessions:\n   • Select day and time\n   • Choose classroom/location\n   • Set duration\n4. Add multiple sessions for weekly classes\n5. Save schedule",
    },
    {
      id: "assign-lecturers",
      title: "Assigning Lecturers",
      content:
        "• Each course must have a primary lecturer\n• You can assign co-lecturers if needed\n• Lecturers can view and manage their course\n• Change lecturer by editing course details\n• Notify lecturers of new assignments",
    },
    {
      id: "manage-enrollment",
      title: "Managing Student Enrollment",
      content:
        "1. Go to Courses > Enrollment\n2. Add students manually or import CSV\n3. Set enrollment deadlines\n4. Monitor enrollment status\n5. Remove students if needed\n6. View enrollment statistics",
    },
    {
      id: "advanced",
      title: "Advanced Features",
      content:
        "• Clone courses for repeated offerings\n• Set prerequisites for courses\n• Create course templates\n• Batch schedule changes\n• Export course information\n• Track course completion",
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
