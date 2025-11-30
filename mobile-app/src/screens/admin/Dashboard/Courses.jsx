import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCourses } from "../../../hooks";
import { getErrorMessage } from "../../../utils/errors";
import { logger } from "../../../utils";

export default function Courses() {
  const { courses, setCourses, createCourse, deleteCourse } = useCourses();

  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    code: "",
    instructor: "",
    semester: "",
    description: "",
    locationName: "",
    latitude: "",
    longitude: "",
  });

  const handleAddCourse = () => {
    if (
      !formData.name.trim() ||
      !formData.id.trim() ||
      !formData.code.trim() ||
      !formData.instructor.trim() ||
      !formData.semester.trim() ||
      !formData.description.trim() ||
      !formData.locationName.trim() ||
      !formData.latitude.trim() ||
      !formData.longitude.trim()
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    // Validate latitude and longitude
    const lat = parseFloat(formData.latitude);
    const lng = parseFloat(formData.longitude);

    if (isNaN(lat) || isNaN(lng)) {
      Alert.alert("Error", "Latitude and Longitude must be valid numbers");
      return;
    }

    if (lat < -90 || lat > 90) {
      Alert.alert("Error", "Latitude must be between -90 and 90");
      return;
    }

    if (lng < -180 || lng > 180) {
      Alert.alert("Error", "Longitude must be between -180 and 180");
      return;
    }

    const newCourseData = {
      name: formData.name,
      id: formData.id,
      code: formData.code,
      instructor: formData.instructor,
      semester: formData.semester,
      description: formData.description,
      locationName: formData.locationName,
      latitude: lat,
      longitude: lng,
      students: 0,
    };

  createCourse(newCourseData);
    setFormData({
      name: "",
      id: "",
      code: "",
      instructor: "",
      semester: "",
      description: "",
      locationName: "",
      latitude: "",
      longitude: "",
    });
    setModalVisible(false);
    logger.info('Course added successfully', { courseCode: formData.code });
    Alert.alert("Success", "Course added successfully!");
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      id: "",
      code: "",
      instructor: "",
      semester: "",
      description: "",
      locationName: "",
      latitude: "",
      longitude: "",
    });
    setModalVisible(false);
  };

  const handleDeleteCourse = (index) => {
    Alert.alert(
      "Delete Course",
      `Are you sure you want to delete "${courses[index].name}"?`,
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            try {
              deleteCourse(courses[index].code);
              logger.info('Course deleted successfully', { courseCode: courses[index].code });
              Alert.alert("Success", "Course deleted successfully!");
            } catch (error) {
              logger.error('Failed to delete course', error);
              const message = getErrorMessage(error);
              Alert.alert("Error", `Failed to delete course: ${message}`);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Courses</Text>
          <View style={styles.searchWrapper}>
            <MaterialIcons
              name="search"
              size={22}
              color="#617289"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by course name or instructor"
              placeholderTextColor="#617289"
            />
          </View>
        </View>
      </SafeAreaView>

      {/* Course List */}
      <ScrollView contentContainerStyle={styles.content}>
        {courses.map((course, index) => (
          <View key={index} style={styles.courseCard}>
            <View style={styles.cardHeader}>
              <View style={styles.cardContent}>
                <Text style={styles.courseTitle}>{course.name}</Text>
                <Text style={styles.courseCode}>{course.code}</Text>
                <Text style={styles.courseInstructor}>{course.instructor}</Text>
                <Text style={styles.courseSemester}>{course.semester}</Text>
                <Text style={styles.courseDescription}>{course.description}</Text>
                <View style={styles.locationContainer}>
                  <MaterialIcons name="location-on" size={14} color="#136dec" />
                  <Text style={styles.locationText}>{course.locationName}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteCourse(index)}
              >
                <MaterialIcons name="delete" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
            <View style={styles.cardFooter}>
              <MaterialIcons name="group" size={18} color="#617289" />
              <Text style={styles.studentCount}>
                {course.students} Students
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Add Course Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Course</Text>
              <TouchableOpacity onPress={handleCancel}>
                <MaterialIcons name="close" size={24} color="#111418" />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.formContainer}
              showsVerticalScrollIndicator={false}
            >
              {/* Course Name Input */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Course Name</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g., Introduction to Data Science"
                  placeholderTextColor="#9ca3af"
                  value={formData.name}
                  onChangeText={(text) =>
                    setFormData({ ...formData, name: text })
                  }
                />
              </View>

              {/* Course Id Input */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Course ID</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g., Id for member joining"
                  placeholderTextColor="#9ca3af"
                  value={formData.id}
                  onChangeText={(text) =>
                    setFormData({ ...formData, id: text })
                  }
                />
              </View>

              {/* Course Code Input */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Course QRCode</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g., CS101"
                  placeholderTextColor="#9ca3af"
                  value={formData.code}
                  onChangeText={(text) =>
                    setFormData({ ...formData, code: text })
                  }
                />
              </View>

              {/* Instructor Input */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Instructor</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g., Dr. John Doe"
                  placeholderTextColor="#9ca3af"
                  value={formData.instructor}
                  onChangeText={(text) =>
                    setFormData({ ...formData, instructor: text })
                  }
                />
              </View>

              {/* Semester/Term Input */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Semester/Term</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g., Fall 2024"
                  placeholderTextColor="#9ca3af"
                  value={formData.semester}
                  onChangeText={(text) =>
                    setFormData({ ...formData, semester: text })
                  }
                />
              </View>

              {/* Description Input */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Description</Text>
                <TextInput
                  style={[styles.formInput, styles.descriptionInput]}
                  placeholder="Enter course description..."
                  placeholderTextColor="#9ca3af"
                  value={formData.description}
                  onChangeText={(text) =>
                    setFormData({ ...formData, description: text })
                  }
                  multiline
                  numberOfLines={4}
                />
              </View>

              {/* Geolocation Section */}
              <View style={styles.geolocationSection}>
                <View style={styles.sectionHeader}>
                  <MaterialIcons name="location-on" size={20} color="#136dec" />
                  <Text style={styles.sectionTitle}>Geolocation</Text>
                </View>
              </View>

              {/* Location Name Input */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Location Name</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder="e.g., Building A, Room 101"
                  placeholderTextColor="#9ca3af"
                  value={formData.locationName}
                  onChangeText={(text) =>
                    setFormData({ ...formData, locationName: text })
                  }
                />
              </View>

              {/* Latitude and Longitude Inputs */}
              <View style={styles.coordinatesRow}>
                <View style={[styles.formGroup, styles.halfWidth]}>
                  <Text style={styles.formLabel}>Latitude</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="-90 to 90"
                    placeholderTextColor="#9ca3af"
                    value={formData.latitude}
                    onChangeText={(text) =>
                      setFormData({ ...formData, latitude: text })
                    }
                    keyboardType="decimal-pad"
                  />
                </View>
                <View style={[styles.formGroup, styles.halfWidth]}>
                  <Text style={styles.formLabel}>Longitude</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="-180 to 180"
                    placeholderTextColor="#9ca3af"
                    value={formData.longitude}
                    onChangeText={(text) =>
                      setFormData({ ...formData, longitude: text })
                    }
                    keyboardType="decimal-pad"
                  />
                </View>
              </View>
            </ScrollView>

            {/* Button Group */}
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddCourse}
              >
                <Text style={styles.addButtonText}>Add Course</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// 💅 Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7f8",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111418",
    marginBottom: 10,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e5e7eb",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#111418",
  },
  content: {
    padding: 16,
    paddingBottom: 120,
  },
  courseCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  cardContent: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111418",
    marginBottom: 4,
  },
  courseCode: {
    fontSize: 12,
    color: "#136dec",
    fontWeight: "600",
    marginBottom: 2,
  },
  courseInstructor: {
    fontSize: 13,
    color: "#617289",
    marginBottom: 2,
  },
  courseSemester: {
    fontSize: 12,
    color: "#9ca3af",
    marginBottom: 4,
  },
  courseDescription: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 12,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  locationText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#136dec",
    fontWeight: "500",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  studentCount: {
    marginLeft: 6,
    fontSize: 13,
    color: "#617289",
  },
  fab: {
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "#136dec",
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    height: 70,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navItem: {
    alignItems: "center",
  },
  navItemActive: {
    alignItems: "center",
  },
  navLabel: {
    fontSize: 12,
    color: "#617289",
    marginTop: 4,
  },
  navLabelActive: {
    fontSize: 12,
    color: "#136dec",
    marginTop: 4,
    fontWeight: "600",
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 20,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111418",
  },
  formContainer: {
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111418",
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#111418",
    backgroundColor: "#f9fafb",
  },
  descriptionInput: {
    textAlignVertical: "top",
    paddingTop: 12,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111418",
  },
  addButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#136dec",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  geolocationSection: {
    marginTop: 24,
    marginBottom: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111418",
    marginLeft: 8,
  },
  coordinatesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
});
