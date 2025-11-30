import React, { useState, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  useColorScheme,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../Components/Header";

export default function UserGuide() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [searchQuery, setSearchQuery] = useState("");

  const guideItems = [
    {
      id: "start",
      title: "Getting Started",
      description: "Initial setup, account configuration.",
      icon: "rocket-launch",
      screenName: "GettingStarted",
    },
    {
      id: "users",
      title: "Managing Users",
      description: "How to add/remove students and lecturers.",
      icon: "group",
      screenName: "ManagingUsers",
    },
    {
      id: "schedule",
      title: "Course & Schedule Management",
      description: "Creating and editing courses, setting schedules.",
      icon: "calendar-month",
      screenName: "CourseSchedule",
    },
    {
      id: "attendance",
      title: "Attendance Tracking",
      description: "How to view and manually edit attendance records.",
      icon: "checklist",
      screenName: "AttendanceTracking",
    },
    {
      id: "reports",
      title: "Generating Reports",
      description: "Exporting attendance data for analysis.",
      icon: "bar-chart",
      screenName: "GeneratingReports",
    },
    {
      id: "settings",
      title: "Account Settings",
      description: "Managing administrator profile and notifications.",
      icon: "settings",
      screenName: "AccountSettings",
    },
    {
      id: "troubleshoot",
      title: "Troubleshooting",
      description: "Common issues and solutions.",
      icon: "quiz",
      screenName: "TroubleshootingGuide",
    },
  ];

  // Filter items berdasarkan search query
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return guideItems;
    
    const query = searchQuery.toLowerCase();
    return guideItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleGuidePress = (screenName, title) => {
    navigation.navigate(screenName, { title });
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#101822" : "#F7F8FA" },
      ]}
    >
      {/* Header */}
      <Header titleHeader="User Guide" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchBox,
            { backgroundColor: isDark ? "#1A2532" : "#FFFFFF" },
          ]}
        >
          <MaterialIcons
            name="search"
            size={22}
            color={isDark ? "#9CA3AF" : "#8A8A8F"}
            style={{ marginLeft: 12 }}
          />
          <TextInput
            placeholder="Search for a guide..."
            placeholderTextColor={isDark ? "#9CA3AF" : "#8A8A8F"}
            style={[styles.searchInput, { color: isDark ? "#E5E7EB" : "#333" }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              style={{ marginRight: 12 }}
            >
              <MaterialIcons
                name="close"
                size={20}
                color={isDark ? "#9CA3AF" : "#8A8A8F"}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Guide List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          searchQuery.length > 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcons
                name="search-off"
                size={48}
                color={isDark ? "#9CA3AF" : "#8A8A8F"}
              />
              <Text
                style={[
                  styles.emptyText,
                  { color: isDark ? "#9CA3AF" : "#8A8A8F" },
                ]}
              >
                No guides found
              </Text>
            </View>
          ) : null
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleGuidePress(item.screenName, item.title)}
            style={[
              styles.card,
              {
                backgroundColor: isDark ? "#1A2532" : "#FFFFFF",
                shadowColor: "#000",
              },
            ]}
          >
            <View style={styles.cardLeft}>
              <View style={[styles.iconWrapper, { backgroundColor: "#4A90E233" }]}>
                <MaterialIcons name={item.icon} size={26} color="#4A90E2" />
              </View>
              <View>
                <Text
                  style={[
                    styles.cardTitle,
                    { color: isDark ? "#E5E7EB" : "#333333" },
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.cardDesc,
                    { color: isDark ? "#9CA3AF" : "#8A8A8F" },
                  ]}
                >
                  {item.description}
                </Text>
              </View>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={22}
              color={isDark ? "#9CA3AF" : "#8A8A8F"}
            />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: { paddingHorizontal: 16, paddingVertical: 12 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    height: 48,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  listContainer: { paddingHorizontal: 16, paddingBottom: 20 },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 12,
    fontWeight: "500",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 16,
    padding: 16,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 1,
  },
  cardLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: { fontSize: 16, fontWeight: "600" },
  cardDesc: { fontSize: 10, marginTop: 2 },
});
