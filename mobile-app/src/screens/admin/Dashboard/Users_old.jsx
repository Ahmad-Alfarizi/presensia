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
import { useCourses } from "../../../context/CourseContext";
import { useUsers } from "../../../context/UserContext";

export default function Users() {
  const { courses } = useCourses();
  const { users, addUser, deleteUser, updateUser, loading } = useUsers();

  // Handle Add User
  const handleAddUserPress = () => {
    if (mockCourses.length === 0) {
      Alert.alert(
        "Course Belum Dibuat",
        "Silakan buat course terlebih dahulu sebelum menambah user.",
        [{ text: "OK", onPress: () => {} }]
      );
      return;
    }
    setModalVisible(true);
  };

  const handleAddUser = () => {
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

    // Create new user with generated ID
    const newUser = {
      name: formData.fullname,
      id: `${Date.now()}`,
      role: formData.role,
      email: formData.email,
      course: formData.course,
      image: "https://via.placeholder.com/48",
      roleColor: formData.role === "Student" ? "#50E3C2" : "#4A90E2",
    };

    setUsers([...users, newUser]);
    resetForm();
    setModalVisible(false);
    Alert.alert("Sukses", "User berhasil ditambahkan");
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
  };

  const getCourseNameById = (courseId) => {
    const course = mockCourses.find((c) => c.id === courseId);
    return course ? course.name : "Unknown";
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

      {/* Top Bar */}
      <View style={styles.topBar}>
        {/* <TouchableOpacity onPress={() => console.log("Back pressed")} style={styles.iconButton}>
          <MaterialIcons name="arrow-back" size={24} color="#111418" />
        </TouchableOpacity> */}
        <Text style={styles.topTitle}>User Management</Text>
        {/* <Image
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkMjpCSoiGSiDutk1WGvFYFnZ5suEfZ1oklVvjiWdvRJEy3coPzrSIX2IXdo2DVCmT8xxZZ1KfwqS48XZc5g5yIzcoOS-STBBp-XUKkrDDo8og05SaIAa_ewTN5IY0Ovbe08xNp5XGluliCZSqCquLeGWSniZ4jhiE_4kR6tp52O89ENur3RB_6tJ5zYKJhSCUTMinBcAyeWc0vbRiwsARn4RyLSiSQWxdE6dkjOFC6YIo28PwftonWxT1irTHkneBZhOS0GBgHMw",
          }}
          style={styles.avatar}
        /> */}
      </View>
      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Search */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={22} color="#617289" style={{ marginRight: 6 }} />
            <TextInput
              placeholder="Search by name or ID"
              placeholderTextColor="#617289"
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialIcons name="filter-list" size={24} color="#4A90E2" />
          </TouchableOpacity>
        </View>

        {/* User Cards */}
        {users.map((u, i) => (
          <View key={i} style={styles.userCard}>
            <View style={styles.userRow}>
              <Image source={{ uri: u.image }} style={styles.userImage} />
              <View style={{ flex: 1 }}>
                <Text style={styles.userName}>{u.name}</Text>
                <Text style={styles.userId}>ID: {u.id}</Text>
              </View>
              <View
                style={[styles.roleBadge, { backgroundColor: `${u.roleColor}20` }]}
              >
                <Text style={[styles.roleText, { color: u.roleColor }]}>{u.role}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.actionRow}>
              <TouchableOpacity style={styles.editButton}>
                <MaterialIcons name="edit" size={20} color="#111418" />
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton}>
                <MaterialIcons name="delete" size={20} color="#E94E77" />
                <Text style={[styles.actionText, { color: "#E94E77" }]}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Floating Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddUserPress}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
        <Text style={styles.fabText}>Add User</Text>
      </TouchableOpacity>

      {/* Add User Modal */}
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
              <Text style={styles.modalTitle}>Tambah User Baru</Text>
              <TouchableOpacity onPress={handleCancel}>
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
                  />
                </View>
              </View>

              {/* Role Selection */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Role</Text>
                <TouchableOpacity
                  style={styles.pickerContainer}
                  onPress={() => setRoleModalVisible(true)}
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
                >
                  <MaterialIcons
                    name="school"
                    size={18}
                    color="#617289"
                    style={styles.pickerIcon}
                  />
                  <Text style={styles.pickerText}>
                    {formData.course
                      ? mockCourses.find((c) => c.id === formData.course)?.code
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
              >
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddUser}
              >
                <Text style={styles.addButtonText}>Tambah User</Text>
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
                  <MaterialIcons name="check" size={20} color="#4A90E2" />
                )}
              </TouchableOpacity>
            ))}
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
          <View style={styles.dropdownMenu}>
            {mockCourses.map((course, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dropdownItem,
                  formData.course === course.id && styles.dropdownItemSelected,
                ]}
                onPress={() => {
                  setFormData({ ...formData, course: course.id });
                  setCourseModalVisible(false);
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.dropdownItemText,
                      formData.course === course.id &&
                        styles.dropdownItemTextSelected,
                    ]}
                  >
                    {course.code}
                  </Text>
                  <Text style={styles.dropdownItemSubtext}>{course.name}</Text>
                </View>
                {formData.course === course.id && (
                  <MaterialIcons name="check" size={20} color="#4A90E2" />
                )}
              </TouchableOpacity>
            ))}
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
  iconButton: { padding: 4 },
  topTitle: { fontSize: 20, fontWeight: "bold", color: "#111418" },
  avatar: { width: 40, height: 40, borderRadius: 20 },
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
  userCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#dbe0e6",
    padding: 16,
    marginTop: 16,
  },
  userRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  userImage: { width: 48, height: 48, borderRadius: 24 },
  userName: { fontSize: 16, fontWeight: "bold", color: "#111418" },
  userId: { color: "#617289", fontSize: 13 },
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
  picker: {
    flex: 1,
    height: 48,
    color: "#111418",
  },
  // Dropdown Modal Styles
  dropdownOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dropdownMenu: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    maxWidth: 280,
    maxHeight: 300,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
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
    fontWeight: "500",
  },
  dropdownItemTextSelected: {
    color: "#4A90E2",
    fontWeight: "600",
  },
  dropdownItemSubtext: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
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
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});