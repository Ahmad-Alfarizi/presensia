import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  StatusBar,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaFrameContext, SafeAreaInsetsContext, SafeAreaView } from "react-native-safe-area-context";
import { useUsers, useCourses } from "../../../hooks";
import { getErrorMessage } from "../../../utils/errors";
import { logger } from "../../../utils";

export default function Users() {
  const { courses } = useCourses();
  const { users, addUser, deleteUser, updateUser, loading } = useUsers();

  const [modalVisible, setModalVisible] = useState(false);
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [courseModalVisible, setCourseModalVisible] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    course: "",
    role: "Student",
  });

  const roles = ["Student", "Faculty", "Admin"];

  // Array of random profile images (cartoon style Google Photos)
  const profileImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBt8Gao32T6gUt31xMTs_L6fFTV-36fCjgxio2xPf9O8Cdrmm29nLfwWQYi-JdvxQDxzgdsg8URgcZCjYVtD1zS1_Pc8lIRUOLbiPb7neTNMlK5z2Erb__NkKzzacuTrn7hhijZGP5gtoUsZCfNcmfV1rPCRd9mq5xXteO96WfOcHEBXbuYnGweVFlBc6ik8ZGuEaL89D_0ngqCw24t1MPcPf7W6lyWwuvnvsyEsZwsgusMKHlMr5y5HNmOzxY3gWuqpCAYEuEi4nY",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAlaSvSxLUWhAbBCk8u2piBBlDr5cW0xozzCELZVKWHgtg8KrCz5Hq8a-e1s0rzK7Lej_qDuhVmSebdGv4FPZLRqc-tlT8lIFNo5_lL18KzwI_2XOU_AhnaHX_ECOrsrmb4lNfimVndpYcX6K4bBIkqpT3208ZGZU_xD42kzU3RXearvwYcAJ5r-L-QPn0fifwOhCJcff35HvDiJ9zZ_XD5rKaQPwZJhVl6YFAoesqbrxVthk8Kh93RBTbk-R_1aX2c1QYOTxYZgak",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAOm4gSiMUFU8PZNdPxfhBB7w-73QZM9XRwBcJjkT9UV0cWOBAm5T3cBgWiO0gJNYsKgBxfHkkYMocSJqTiP1_pLPI4VAFJS4mRk75dKQUQRVfKEcjKfkNzRL1AiCxWR9DBgExbtTviysK5v1QsZ4mMbojaBM7u9PX1LCkn7vOWd4vB5mxLTY4gSyIYtLUA35dlU86LqXJgkq2GZRj8__LoG8W7kMmGZT4jDed6b8dA82bPC2au4oXslxWbPYBs4ofFtaNAEE1JD_E",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBkMjpCSoiGSiDutk1WGvFYFnZ5suEfZ1oklVvjiWdvRJEy3coPzrSIX2IXdo2DVCmT8xxZZ1KfwqS48XZc5g5yIzcoOS-STBBp-XUKkrDDo8og05SaIAa_ewTN5IY0Ovbe08xNp5XGluliCZSqCquLeGWSniZ4jhiE_4kR6tp52O89ENur3RB_6tJ5zYKJhSCUTMinBcAyeWc0vbRiwsARn4RyLSiSQWxdE6dkjOFC6YIo28PwftonWxT1irTHkneBZhOS0GBgHMw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCdFtS5HkUwUmYXm7bB1Y8Z2L3Q4r5S6T7U8V9W0X1Y2Z3A4B5C6D7E8F9G",
  ];

  // Get random profile image
  const getRandomProfileImage = () => {
    return profileImages[Math.floor(Math.random() * profileImages.length)];
  };

  // Handle Add/Edit User Press
  const handleAddUserPress = () => {
    if (courses.length === 0) {
      Alert.alert(
        "Course Belum Dibuat",
        "Silakan buat course terlebih dahulu sebelum menambah user.",
        [{ text: "OK", onPress: () => {} }]
      );
      return;
    }
    setEditingUserId(null);
    resetForm();
    setModalVisible(true);
  };

  // Handle Edit User Press
  const handleEditUserPress = (user) => {
    if (courses.length === 0) {
      Alert.alert(
        "Course Belum Dibuat",
        "Silakan buat course terlebih dahulu sebelum edit user.",
        [{ text: "OK", onPress: () => {} }]
      );
      return;
    }
    setEditingUserId(user.id);
    setFormData({
      fullname: user.name,
      email: user.email,
      password: "password", // Placeholder
      course: user.course,
      role: user.role,
    });
    setModalVisible(true);
  };

  const handleSaveUser = async () => {
    if (
      !formData.fullname.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.course.trim()
    ) {
      Alert.alert("Error", "Silakan isi semua field yang diperlukan");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert("Error", "Format email tidak valid");
      return;
    }

    // Password validation
    if (formData.password.length < 6) {
      Alert.alert("Error", "Password harus minimal 6 karakter");
      return;
    }

    try {
      if (editingUserId) {
        // Update existing user
        await updateUser(editingUserId, formData);
        logger.info('User updated successfully', { userId: editingUserId });
        Alert.alert("Sukses", "User berhasil diperbarui");
      } else {
        // Add new user
        await addUser(formData);
        logger.info('User added successfully', { email: formData.email });
        Alert.alert("Sukses", "User berhasil ditambahkan");
      }
      resetForm();
      setModalVisible(false);
    } catch (error) {
      logger.error('Failed to save user', error);
      // Prefer mapping AppError.code to friendly message, fallback to error.message
      const code = error?.code || null;
      const message = code ? getErrorMessage(code, 'indonesian') : (error?.message || 'Gagal menyimpan user');
      Alert.alert("Error", `Gagal menyimpan user: ${message}`);
    }
  };

  const handleDeleteUser = (userId, userName) => {
    Alert.alert(
      "Hapus User",
      `Apakah Anda yakin ingin menghapus "${userName}"?`,
      [
        {
          text: "Batal",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Hapus",
          onPress: async () => {
            try {
              await deleteUser(userId);
              logger.info('User deleted successfully', { userId });
              Alert.alert("Sukses", "User berhasil dihapus");
            } catch (error) {
              logger.error('Failed to delete user', error);
                const code = error?.code || null;
                const message = code ? getErrorMessage(code, 'indonesian') : (error?.message || 'Gagal menghapus user');
                Alert.alert("Error", `Gagal menghapus user: ${message}`);
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  const resetForm = () => {
    setFormData({
      fullname: "",
      email: "",
      password: "",
      course: "",
      role: "Student",
    });
  };

  const handleCancel = () => {
    resetForm();
    setModalVisible(false);
    setEditingUserId(null);
  };

  const getCourseName = (courseCode) => {
    const course = courses.find((c) => c.code === courseCode);
    return course ? course.code : "Unknown";
  };

  const filteredUsers = users.filter((user) => {
    // Only show users whose course still exists
    const courseExists = courses.some((c) => c.code === user.course);
    if (!courseExists) return false;

    // Filter by search query (name, email, or ID)
    const matchesSearch = !searchQuery.trim() ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by role
    const matchesRole = selectedRole === "All" || user.role === selectedRole;

    // Filter by course
    const matchesCourse = selectedCourse === "All" || user.course === selectedCourse;

    return matchesSearch && matchesRole && matchesCourse;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topTitle}>User Management</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Search */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={22} color="#617289" style={{ marginRight: 6 }} />
            <TextInput
              placeholder="Search by name, email or ID"
              placeholderTextColor="#617289"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <MaterialIcons name="close" size={20} color="#617289" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialIcons name="filter-list" size={24} color="#4A90E2" />
          </TouchableOpacity>
        </View>

        {/* Filter Pills */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterPillsContainer}
        >
          {/* Role Filter */}
          <View style={styles.filterPillGroup}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {["All", "Student", "Faculty", "Admin"].map((role) => (
                <TouchableOpacity
                  key={role}
                  style={[
                    styles.filterPill,
                    selectedRole === role && styles.filterPillActive,
                  ]}
                  onPress={() => setSelectedRole(role)}
                >
                  <Text
                    style={[
                      styles.filterPillText,
                      selectedRole === role && styles.filterPillTextActive,
                    ]}
                  >
                    {role}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>

        {/* Course Filter */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.courseFilterContainer}
        >
          <TouchableOpacity
            style={[
              styles.coursePill,
              selectedCourse === "All" && styles.coursePillActive,
            ]}
            onPress={() => setSelectedCourse("All")}
          >
            <Text
              style={[
                styles.coursePillText,
                selectedCourse === "All" && styles.coursePillTextActive,
              ]}
            >
              All Courses
            </Text>
          </TouchableOpacity>
          {courses.map((course) => (
            <TouchableOpacity
              key={course.code}
              style={[
                styles.coursePill,
                selectedCourse === course.code && styles.coursePillActive,
              ]}
              onPress={() => setSelectedCourse(course.code)}
            >
              <Text
                style={[
                  styles.coursePillText,
                  selectedCourse === course.code && styles.coursePillTextActive,
                ]}
              >
                {course.code}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Loading Indicator */}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4A90E2" />
          </View>
        )}

        {/* User Cards */}
        {filteredUsers.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="people" size={48} color="#dbe0e6" />
            <Text style={styles.emptyText}>Belum ada user</Text>
          </View>
        ) : (
          filteredUsers.map((u) => (
            <View key={u.id} style={styles.userCard}>
              <View style={styles.userRow}>
                <Image source={{ uri: u.image }} style={styles.userImage} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.userName}>{u.name}</Text>
                  <Text style={styles.userId}>ID: {u.id}</Text>
                  <Text style={styles.userEmail}>{u.email}</Text>
                  <Text style={styles.userCourse}>Course: {getCourseName(u.course)}</Text>
                </View>
                <View
                  style={[styles.roleBadge, { backgroundColor: `${u.roleColor}20` }]}
                >
                  <Text style={[styles.roleText, { color: u.roleColor }]}>{u.role}</Text>
                </View>
              </View>
              <View style={styles.divider} />
              <View style={styles.actionRow}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleEditUserPress(u)}
                >
                  <MaterialIcons name="edit" size={20} color="#111418" />
                  <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteUser(u.id, u.name)}
                >
                  <MaterialIcons name="delete" size={20} color="#E94E77" />
                  <Text style={[styles.actionText, { color: "#E94E77" }]}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddUserPress}
        disabled={loading}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
        <Text style={styles.fabText}>Add User</Text>
      </TouchableOpacity>

      {/* Add/Edit User Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingUserId ? "Edit User" : "Tambah User Baru"}
              </Text>
              <TouchableOpacity onPress={handleCancel} disabled={loading}>
                <MaterialIcons name="close" size={24} color="#111418" />
              </TouchableOpacity>
            </View>

            {/* Form Content */}
            <ScrollView
              style={styles.formContainer}
              showsVerticalScrollIndicator={false}
            >
              {/* Full Name Input */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Nama Lengkap</Text>
                <View style={styles.inputWrapper}>
                  <MaterialIcons
                    name="person"
                    size={18}
                    color="#617289"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.formInput}
                    placeholder="Masukkan nama lengkap"
                    placeholderTextColor="#9ca3af"
                    value={formData.fullname}
                    onChangeText={(text) =>
                      setFormData({ ...formData, fullname: text })
                    }
                    editable={!loading}
                  />
                </View>
              </View>

              {/* Email Input */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Email</Text>
                <View style={styles.inputWrapper}>
                  <MaterialIcons
                    name="email"
                    size={18}
                    color="#617289"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.formInput}
                    placeholder="nama@example.com"
                    placeholderTextColor="#9ca3af"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(text) =>
                      setFormData({ ...formData, email: text })
                    }
                    editable={!loading}
                  />
                </View>
              </View>

              {/* Password Input */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Password</Text>
                <View style={styles.inputWrapper}>
                  <MaterialIcons
                    name="lock"
                    size={18}
                    color="#617289"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.formInput}
                    placeholder="Minimal 6 karakter"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry={true}
                    value={formData.password}
                    onChangeText={(text) =>
                      setFormData({ ...formData, password: text })
                    }
                    editable={!loading}
                  />
                </View>
              </View>

              {/* Role Selection */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Role</Text>
                <TouchableOpacity
                  style={styles.pickerContainer}
                  onPress={() => setRoleModalVisible(true)}
                  disabled={loading}
                >
                  <MaterialIcons
                    name="security"
                    size={18}
                    color="#617289"
                    style={styles.pickerIcon}
                  />
                  <Text style={styles.pickerText}>{formData.role}</Text>
                  <MaterialIcons
                    name="expand-more"
                    size={18}
                    color="#617289"
                    style={{ marginLeft: "auto" }}
                  />
                </TouchableOpacity>
              </View>

              {/* Course Selection */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Course</Text>
                <TouchableOpacity
                  style={styles.pickerContainer}
                  onPress={() => setCourseModalVisible(true)}
                  disabled={loading}
                >
                  <MaterialIcons
                    name="school"
                    size={18}
                    color="#617289"
                    style={styles.pickerIcon}
                  />
                  <Text style={styles.pickerText}>
                    {formData.course
                      ? courses.find((c) => c.code === formData.course)?.code
                      : "Pilih Course..."}
                  </Text>
                  <MaterialIcons
                    name="expand-more"
                    size={18}
                    color="#617289"
                    style={{ marginLeft: "auto" }}
                  />
                </TouchableOpacity>
              </View>
            </ScrollView>

            {/* Button Group */}
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.addButton, loading && styles.addButtonDisabled]}
                onPress={handleSaveUser}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.addButtonText}>
                    {editingUserId ? "Update User" : "Tambah User"}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Role Selection Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={roleModalVisible}
        onRequestClose={() => setRoleModalVisible(false)}
      >
        <View style={styles.dropdownOverlay}>
          <TouchableOpacity
            style={styles.dropdownBackdrop}
            activeOpacity={1}
            onPress={() => setRoleModalVisible(false)}
          />
          <View style={styles.dropdownMenu}>
            <ScrollView scrollEnabled={false}>
              {roles.map((role, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    formData.role === role && styles.dropdownItemSelected,
                  ]}
                  onPress={() => {
                    setFormData({ ...formData, role });
                    setRoleModalVisible(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      formData.role === role && styles.dropdownItemTextSelected,
                    ]}
                  >
                    {role}
                  </Text>
                  {formData.role === role && (
                    <MaterialIcons name="check" size={20} color="#4A90E2" style={{ marginLeft: "auto" }} />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Course Selection Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={courseModalVisible}
        onRequestClose={() => setCourseModalVisible(false)}
      >
        <View style={styles.dropdownOverlay}>
          <TouchableOpacity
            style={styles.dropdownBackdrop}
            activeOpacity={1}
            onPress={() => setCourseModalVisible(false)}
          />
          <View style={[styles.dropdownMenu, { maxHeight: 400 }]}>
            <ScrollView scrollEnabled={courses.length > 5}>
              {courses.map((course, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dropdownItem,
                    formData.course === course.code && styles.dropdownItemSelected,
                  ]}
                  onPress={() => {
                    setFormData({ ...formData, course: course.code });
                    setCourseModalVisible(false);
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.dropdownItemText,
                        formData.course === course.code &&
                          styles.dropdownItemTextSelected,
                      ]}
                    >
                      {course.code}
                    </Text>
                    <Text style={styles.dropdownItemSubtext}>{course.name}</Text>
                  </View>
                  {formData.course === course.code && (
                    <MaterialIcons name="check" size={20} color="#4A90E2" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F7F8FA" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 16,
    elevation: 2,
  },
  topTitle: { fontSize: 20, fontWeight: "bold", color: "#111418" },
  content: { padding: 16, paddingBottom: 120 },
  searchRow: { flexDirection: "row", gap: 12, marginTop: 12 },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#dbe0e6",
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    height: 48,
  },
  searchInput: { flex: 1, color: "#111418", fontSize: 14 },
  filterButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#4A90E220",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#4A90E240",
    borderWidth: 1,
  },
  filterPillsContainer: {
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 0,
  },
  filterPillGroup: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
  },
  filterPill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginRight: 8,
  },
  filterPillActive: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#617289",
  },
  filterPillTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  courseFilterContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  coursePill: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginRight: 8,
  },
  coursePillActive: {
    backgroundColor: "#50E3C2",
    borderColor: "#50E3C2",
  },
  coursePillText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#617289",
  },
  coursePillTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 14,
    color: "#9ca3af",
    marginTop: 12,
  },
  userCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dbe0e6",
    padding: 16,
    marginTop: 16,
  },
  userRow: { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  userImage: { width: 48, height: 48, borderRadius: 24 },
  userName: { fontSize: 16, fontWeight: "bold", color: "#111418" },
  userId: { color: "#617289", fontSize: 12, marginTop: 2 },
  userEmail: { color: "#617289", fontSize: 11, marginTop: 2 },
  userCourse: { color: "#4A90E2", fontSize: 11, marginTop: 2, fontWeight: "500" },
  roleBadge: { borderRadius: 9999, paddingVertical: 4, paddingHorizontal: 10 },
  roleText: { fontSize: 12, fontWeight: "bold" },
  divider: { height: 1, backgroundColor: "#dbe0e6", marginVertical: 12 },
  actionRow: { flexDirection: "row", justifyContent: "flex-end", gap: 12 },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dbe0e6",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E94E77",
    backgroundColor: "#E94E7720",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    gap: 4,
  },
  actionText: { fontSize: 13, fontWeight: "500" },
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#4A90E2",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 18,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  fabText: { color: "#fff", fontWeight: "bold", fontSize: 15 },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#dbe0e6",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111418",
  },
  formContainer: {
    marginBottom: 16,
    maxHeight: "70%",
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111418",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dbe0e6",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    height: 48,
  },
  inputIcon: {
    marginRight: 8,
  },
  formInput: {
    flex: 1,
    color: "#111418",
    fontSize: 14,
    paddingVertical: 8,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dbe0e6",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    height: 48,
    justifyContent: "space-between",
  },
  pickerIcon: {
    marginRight: 8,
  },
  pickerText: {
    flex: 1,
    color: "#111418",
    fontSize: 14,
  },
  // Dropdown Modal Styles
  dropdownOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdownBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  dropdownMenu: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    width: "80%",
    maxHeight: 300,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  dropdownItemSelected: {
    backgroundColor: "#4A90E210",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#111418",
    fontWeight: "600",
  },
  dropdownItemTextSelected: {
    color: "#4A90E2",
    fontWeight: "700",
  },
  dropdownItemSubtext: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 3,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#dbe0e6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7F8FA",
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111418",
  },
  addButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#4A90E2",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonDisabled: {
    backgroundColor: "#a0a0a0",
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
