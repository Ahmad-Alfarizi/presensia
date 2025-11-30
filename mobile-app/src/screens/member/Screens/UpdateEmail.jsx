// UpdateEmailScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Header from "../../admin/Components/Header";

export default function UpdateEmailScreen() {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    // Lexend: require("@/assets/fonts/Lexend-Regular.ttf"),
  });

  const [newEmail, setNewEmail] = useState("");
  const [confirmNewEmail, setConfirmNewEmail] = useState("");
  const currentEmail = "student@university.edu";

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <Header titleHeader="Update Email" />

      {/* Main */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.form}>
          {/* Current Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Current Email</Text>
            <TextInput
              style={[styles.input, styles.readonlyInput]}
              value={currentEmail}
              editable={false}
              placeholder="student@university.edu"
              placeholderTextColor="#64748B"
            />
          </View>

          {/* New Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>New Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your new email address"
              placeholderTextColor="#64748B"
              value={newEmail}
              onChangeText={setNewEmail}
              keyboardType="email-address"
            />
          </View>

          {/* Confirm New Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Confirm New Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your new email address"
              placeholderTextColor="#64748B"
              value={confirmNewEmail}
              onChangeText={setConfirmNewEmail}
              keyboardType="email-address"
            />
          </View>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity activeOpacity={0.9}>
          <LinearGradient
            colors={["#007BFF", "#0056b3"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    fontFamily: "Lexend",
    marginRight: 40,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  form: {
    maxWidth: 600,
    alignSelf: "center",
    width: "100%",
  },
  fieldGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1E293B",
    marginBottom: 6,
    fontFamily: "Lexend",
  },
  input: {
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#1E293B",
    fontFamily: "Lexend",
  },
  readonlyInput: {
    backgroundColor: "#F1F5F9",
  },
  footer: {
    padding: 16,
    backgroundColor: "#F8FAFC",
  },
  saveButton: {
    width: "100%",
    borderRadius: 12,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "Lexend",
  },
});
