import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../hooks";
import { auth } from "../../../config/firebase";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { getErrorMessage } from "../../../utils/errors";
import { logger } from "../../../utils";

export default function ChangePassword() {
  const navigation = useNavigation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { user } = useAuth();

  const validatePasswords = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all password fields');
      return false;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return false;
    }
    if (newPassword.length < 8) {
      Alert.alert('Error', 'New password must be at least 8 characters long');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validatePasswords()) return;

    try {
      logger.info('Password change initiated');
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      // Re-authenticate user
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Update password
      await updatePassword(auth.currentUser, newPassword);

      logger.info('Password changed successfully');
      Alert.alert(
        'Success', 
        'Password has been changed successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      logger.error('Password change error', error);
      const message = getErrorMessage(error);
      Alert.alert('Error', message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        {/* Current Password */}
        <View style={styles.field}>
          <Text style={styles.label}>Current Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your current password"
              placeholderTextColor="#999"
              secureTextEntry={!showCurrent}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TouchableOpacity
              onPress={() => setShowCurrent(!showCurrent)}
              style={styles.iconWrapper}
            >
              <MaterialIcons
                name={showCurrent ? "visibility" : "visibility-off"}
                size={22}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* New Password */}
        <View style={styles.field}>
          <Text style={styles.label}>New Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Enter your new password"
              placeholderTextColor="#999"
              secureTextEntry={!showNew}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity
              onPress={() => setShowNew(!showNew)}
              style={styles.iconWrapper}
            >
              <MaterialIcons
                name={showNew ? "visibility" : "visibility-off"}
                size={22}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.hint}>Must be at least 8 characters.</Text>

        {/* Confirm New Password */}
        <View style={styles.field}>
          <Text style={styles.label}>Confirm New Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Confirm your new password"
              placeholderTextColor="#999"
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={() => setShowConfirm(!showConfirm)}
              style={styles.iconWrapper}
            >
              <MaterialIcons
                name={showConfirm ? "visibility" : "visibility-off"}
                size={22}
                color="#666"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Save Button */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f8fc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#136dec",
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: "space-between",
  },
  backButton: {
    padding: 6,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 24,
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    paddingRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#333",
  },
  iconWrapper: {
    padding: 4,
  },
  hint: {
    color: "#666",
    fontSize: 14,
    marginTop: -12,
    marginBottom: 12,
  },
  footer: {
    padding: 16,
  },
  saveButton: {
    height: 52,
    borderRadius: 10,
    backgroundColor: "#357ABD",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
