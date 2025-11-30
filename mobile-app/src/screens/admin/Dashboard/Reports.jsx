import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const screenWidth = Dimensions.get("window").width - 32;

export default function Reports() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [dateRange, setDateRange] = useState("30days");
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({ courses: [] });
  const [isLoading, setIsLoading] = useState(false);

  const mockCourses = [
    { id: 1, name: "Data Structures & Algorithms", code: "CS201", rate: 98.2 },
    { id: 2, name: "Intro to Programming", code: "CS101", rate: 96.5 },
    { id: 3, name: "Linear Algebra", code: "MATH202", rate: 95.1 },
    { id: 4, name: "Web Development", code: "CS301", rate: 92.3 },
    { id: 5, name: "Database Systems", code: "CS302", rate: 91.8 },
  ];

  const mockStudents = [
    { id: 1, name: "John Doe", studentId: "ID: 112233", rate: 68 },
    { id: 2, name: "Emily White", studentId: "ID: 445566", rate: 72 },
    { id: 3, name: "Michael Brown", studentId: "ID: 778899", rate: 65 },
    { id: 4, name: "Sarah Johnson", studentId: "ID: 334455", rate: 70 },
  ];

  const filteredCourses = selectedFilters.courses.length > 0 
    ? mockCourses.filter(c => selectedFilters.courses.includes(c.id))
    : mockCourses;

  const stats = useMemo(() => {
    const avgAttendance = (filteredCourses.reduce((s, c) => s + c.rate, 0) / filteredCourses.length).toFixed(1);
    return { attendanceRate: avgAttendance, activeStudents: 1100, trend: "+1.2%" };
  }, [filteredCourses]);

  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [{ data: [85, 90, 95, 92, 88] }],
  };

  const handleExport = (format) => {
    setIsLoading(true);
    setTimeout(() => {
      Alert.alert("Success", `Exported as ${format}!`);
      setExportModalVisible(false);
      setIsLoading(false);
    }, 1500);
  };

  const toggleFilter = (courseId) => {
    setSelectedFilters(prev => ({
      ...prev,
      courses: prev.courses.includes(courseId)
        ? prev.courses.filter(id => id !== courseId)
        : [...prev.courses, courseId],
    }));
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#101822" : "#F7F8FA" }]}>
      <SafeAreaView>
        <View style={[styles.header, { backgroundColor: isDark ? "#1A2532" : "#FFFFFF" }]}>
          <Text style={[styles.headerTitle, { color: isDark ? "#E5E7EB" : "#111418" }]}>
            Reporting & Analytics
          </Text>
        </View>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
        {/* Filter Row */}
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: isDark ? "#1A2532" : "#fff" }]}
            onPress={() => setDateRange(dateRange === "30days" ? "90days" : "30days")}
          >
            <Ionicons name="calendar-outline" size={20} color={isDark ? "#9CA3AF" : "#617289"} />
            <Text style={[styles.filterText, { color: isDark ? "#E5E7EB" : "#111418" }]}>
              {dateRange === "30days" ? "Last 30 Days" : "Last 90 Days"}
            </Text>
            <Ionicons name="chevron-down" size={18} color={isDark ? "#9CA3AF" : "#617289"} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: isDark ? "#1A2532" : "#E8F0FE" }]}
            onPress={() => setFilterModalVisible(true)}
          >
            <Ionicons name="filter" size={20} color="#4A90E2" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: isDark ? "#1A2532" : "#E8F0FE" }]}
            onPress={() => setExportModalVisible(true)}
          >
            <MaterialIcons name="file-download" size={24} color="#136dec" />
          </TouchableOpacity>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          <View style={[styles.card, { backgroundColor: isDark ? "#1A2532" : "#fff" }]}>
            <View style={styles.cardHeader}>
              <Ionicons name="pie-chart-outline" size={20} color={isDark ? "#9CA3AF" : "#617289"} />
              <Text style={[styles.cardLabel, { color: isDark ? "#9CA3AF" : "#617289" }]}>Attendance Rate</Text>
            </View>
            <Text style={[styles.cardValue, { color: isDark ? "#E5E7EB" : "#111418" }]}>{stats.attendanceRate}%</Text>
            <View style={styles.trendUp}>
              <Ionicons name="trending-up-outline" size={16} color="#50E3C2" />
              <Text style={styles.trendUpText}>{stats.trend}</Text>
            </View>
          </View>

          <View style={[styles.card, { backgroundColor: isDark ? "#1A2532" : "#fff" }]}>
            <View style={styles.cardHeader}>
              <Ionicons name="people-outline" size={20} color={isDark ? "#9CA3AF" : "#617289"} />
              <Text style={[styles.cardLabel, { color: isDark ? "#9CA3AF" : "#617289" }]}>Active Students</Text>
            </View>
            <Text style={[styles.cardValue, { color: isDark ? "#E5E7EB" : "#111418" }]}>{stats.activeStudents}</Text>
            <View style={styles.trendFlat}>
              <Ionicons name="remove-outline" size={16} color={isDark ? "#9CA3AF" : "#617289"} />
              <Text style={[styles.trendFlatText, { color: isDark ? "#9CA3AF" : "#617289" }]}>-5</Text>
            </View>
          </View>
        </View>

        {/* Attendance Trend */}
        <View style={[styles.section, { backgroundColor: isDark ? "#1A2532" : "#fff" }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? "#E5E7EB" : "#111418" }]}>Attendance Trend</Text>
            <TouchableOpacity onPress={() => Alert.alert("Attendance Trend", "View full details")}>
              <Text style={styles.sectionLink}>Details →</Text>
            </TouchableOpacity>
          </View>
          <BarChart
            data={chartData}
            width={screenWidth}
            height={180}
            yAxisSuffix="%"
            chartConfig={{
              backgroundColor: isDark ? "#1A2532" : "#fff",
              backgroundGradientFrom: isDark ? "#1A2532" : "#fff",
              backgroundGradientTo: isDark ? "#1A2532" : "#fff",
              fillShadowGradient: "#4A90E2",
              fillShadowGradientOpacity: 0.8,
              color: () => "#4A90E2",
              labelColor: () => (isDark ? "#9CA3AF" : "#617289"),
              barPercentage: 0.6,
            }}
            style={{ borderRadius: 12 }}
          />
        </View>

        {/* Top Courses */}
        <View style={[styles.section, { backgroundColor: isDark ? "#1A2532" : "#fff" }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? "#E5E7EB" : "#111418" }]}>Top Courses</Text>
            <TouchableOpacity onPress={() => Alert.alert("Courses", `${filteredCourses.length} courses`)}>
              <Text style={styles.sectionLink}>Details →</Text>
            </TouchableOpacity>
          </View>
          {filteredCourses.slice(0, 3).map((course, i) => (
            <View key={course.id}>
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => Alert.alert(course.name, `${course.code}: ${course.rate}%`)}
              >
                <View>
                  <Text style={[styles.listTitle, { color: isDark ? "#E5E7EB" : "#111418" }]}>{course.name}</Text>
                  <Text style={[styles.listSubtitle, { color: isDark ? "#9CA3AF" : "#617289" }]}>{course.code}</Text>
                </View>
                <Text style={[styles.listValue, { color: isDark ? "#E5E7EB" : "#111418" }]}>{course.rate}%</Text>
              </TouchableOpacity>
              {i < 2 && <View style={[styles.divider, { backgroundColor: isDark ? "#374151" : "#dbe0e6" }]} />}
            </View>
          ))}
        </View>

        {/* Low Attendance */}
        <View style={[styles.section, { backgroundColor: isDark ? "#1A2532" : "#fff" }]}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: isDark ? "#E5E7EB" : "#111418" }]}>Low Attendance Students</Text>
            <TouchableOpacity onPress={() => Alert.alert("Students", "View all students")}>
              <Text style={styles.sectionLink}>View All →</Text>
            </TouchableOpacity>
          </View>
          {mockStudents.slice(0, 2).map((student, i) => (
            <View key={student.id}>
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => Alert.alert(student.name, `${student.studentId}: ${student.rate}%`)}
              >
                <View style={styles.row}>
                  <View style={styles.avatarPlaceholder} />
                  <View>
                    <Text style={[styles.listTitle, { color: isDark ? "#E5E7EB" : "#111418" }]}>{student.name}</Text>
                    <Text style={[styles.listSubtitle, { color: isDark ? "#9CA3AF" : "#617289" }]}>{student.studentId}</Text>
                  </View>
                </View>
                <Text style={[styles.listValue, { color: "#E94E77" }]}>{student.rate}%</Text>
              </TouchableOpacity>
              {i < 1 && <View style={[styles.divider, { backgroundColor: isDark ? "#374151" : "#dbe0e6" }]} />}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Filter Modal */}
      <Modal visible={filterModalVisible} transparent animationType="slide" onRequestClose={() => setFilterModalVisible(false)}>
        <View style={[styles.modalOverlay, { backgroundColor: isDark ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.5)" }]}>
          <View style={[styles.modalContent, { backgroundColor: isDark ? "#1A2532" : "#fff" }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: isDark ? "#E5E7EB" : "#111418" }]}>Filter Reports</Text>
              <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
                <Ionicons name="close" size={24} color={isDark ? "#E5E7EB" : "#111418"} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalBody}>
              <Text style={[styles.filterLabel, { color: isDark ? "#E5E7EB" : "#111418" }]}>Courses</Text>
              {mockCourses.map((course) => (
                <TouchableOpacity key={course.id} style={styles.filterOption} onPress={() => toggleFilter(course.id)}>
                  <View style={[styles.checkbox, { backgroundColor: selectedFilters.courses.includes(course.id) ? "#4A90E2" : "transparent", borderColor: isDark ? "#9CA3AF" : "#617289" }]}>
                    {selectedFilters.courses.includes(course.id) && <Ionicons name="checkmark" size={16} color="#fff" />}
                  </View>
                  <Text style={[styles.filterOptionText, { color: isDark ? "#E5E7EB" : "#111418" }]}>{course.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity style={styles.applyButton} onPress={() => setFilterModalVisible(false)}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Export Modal */}
      <Modal visible={exportModalVisible} transparent animationType="slide" onRequestClose={() => setExportModalVisible(false)}>
        <View style={[styles.modalOverlay, { backgroundColor: isDark ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.5)" }]}>
          <View style={[styles.modalContent, { backgroundColor: isDark ? "#1A2532" : "#fff" }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: isDark ? "#E5E7EB" : "#111418" }]}>Export Report</Text>
              <TouchableOpacity onPress={() => setExportModalVisible(false)}>
                <Ionicons name="close" size={24} color={isDark ? "#E5E7EB" : "#111418"} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <TouchableOpacity style={[styles.exportButton, { backgroundColor: isDark ? "#374151" : "#f0f0f0" }]} onPress={() => handleExport("PDF")} disabled={isLoading}>
                {isLoading ? <ActivityIndicator size="small" color="#4A90E2" /> : (
                  <>
                    <MaterialIcons name="picture-as-pdf" size={24} color="#E94E77" />
                    <Text style={[styles.exportButtonText, { color: isDark ? "#E5E7EB" : "#111418" }]}>Export as PDF</Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={[styles.exportButton, { backgroundColor: isDark ? "#374151" : "#f0f0f0" }]} onPress={() => handleExport("Excel")} disabled={isLoading}>
                {isLoading ? <ActivityIndicator size="small" color="#4A90E2" /> : (
                  <>
                    <MaterialIcons name="table-chart" size={24} color="#50C878" />
                    <Text style={[styles.exportButtonText, { color: isDark ? "#E5E7EB" : "#111418" }]}>Export as Excel</Text>
                  </>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={[styles.exportButton, { backgroundColor: isDark ? "#374151" : "#f0f0f0" }]} onPress={() => handleExport("CSV")} disabled={isLoading}>
                {isLoading ? <ActivityIndicator size="small" color="#4A90E2" /> : (
                  <>
                    <MaterialIcons name="description" size={24} color="#4A90E2" />
                    <Text style={[styles.exportButtonText, { color: isDark ? "#E5E7EB" : "#111418" }]}>Export as CSV</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: "row", alignItems: "start", paddingHorizontal: 16, paddingVertical: 14, elevation: 2 },
  headerTitle: { fontSize: 18, fontWeight: "700" },
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  filterButton: { flex: 1, borderWidth: 1, borderColor: "#dbe0e6", borderRadius: 8, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 12, paddingVertical: 10 },
  filterText: { fontWeight: "500" },
  iconButton: { width: 48, height: 48, borderRadius: 8, borderWidth: 1, borderColor: "#4A90E2", alignItems: "center", justifyContent: "center", marginLeft: 8 },
  statsGrid: { flexDirection: "row", gap: 12, marginTop: 16 },
  card: { flex: 1, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: "#dbe0e6" },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 6 },
  cardLabel: { fontSize: 13 },
  cardValue: { fontSize: 26, fontWeight: "700", marginTop: 4 },
  trendUp: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  trendUpText: { color: "#50E3C2", fontSize: 13 },
  trendFlat: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  trendFlatText: { fontSize: 13 },
  section: { borderRadius: 12, padding: 12, borderWidth: 1, borderColor: "#dbe0e6", marginTop: 20 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
  sectionTitle: { fontSize: 16, fontWeight: "600" },
  sectionLink: { color: "#4A90E2", fontWeight: "500" },
  listItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 6 },
  listTitle: { fontSize: 15, fontWeight: "500" },
  listSubtitle: { fontSize: 12 },
  listValue: { fontSize: 16, fontWeight: "700" },
  divider: { height: 1, marginVertical: 4 },
  avatarPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(97,114,137,0.2)", marginRight: 8 },
  modalOverlay: { flex: 1, justifyContent: "flex-end" },
  modalContent: { borderTopLeftRadius: 20, borderTopRightRadius: 20, paddingTop: 16, maxHeight: "80%" },
  modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 16, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: "#e5e7eb" },
  modalTitle: { fontSize: 18, fontWeight: "600" },
  modalBody: { paddingHorizontal: 16, paddingVertical: 12 },
  filterLabel: { fontSize: 14, fontWeight: "600", marginBottom: 12 },
  filterOption: { flexDirection: "row", alignItems: "center", paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#e5e7eb" },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 2, alignItems: "center", justifyContent: "center", marginRight: 12 },
  filterOptionText: { fontSize: 15, flex: 1 },
  applyButton: { backgroundColor: "#4A90E2", paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, marginHorizontal: 16, marginVertical: 12, alignItems: "center" },
  applyButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  exportButton: { flexDirection: "row", alignItems: "center", paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, marginBottom: 12 },
  exportButtonText: { fontSize: 15, fontWeight: "500", marginLeft: 12 },
});
