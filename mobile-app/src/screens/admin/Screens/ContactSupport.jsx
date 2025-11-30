import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  useColorScheme,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../Components/Header";

export default function ContactSupport() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSend = () => {
    if (subject.trim() && message.trim()) {
      setShowToast(true);
      setSubject("");
      setMessage("");
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#101822" : "#f6f7f8" },
      ]}
    >
      {/* Header */}
      <Header titleHeader="Contact Support" />

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Info Text */}
        <Text
          style={[
            styles.infoText,
            { color: isDark ? "#f1f5f9" : "#111418" },
          ]}
        >
          Fill out the form below and our team will get back to you.
        </Text>

        {/* Subject Field */}
        <View style={styles.inputGroup}>
          <Text
            style={[
              styles.label,
              { color: isDark ? "#f1f5f9" : "#111418" },
            ]}
          >
            Subject
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                color: isDark ? "#f1f5f9" : "#111418",
                backgroundColor: isDark ? "#1e293b80" : "#ffffff",
                borderColor: isDark ? "#334155" : "#dbe0e6",
              },
            ]}
            placeholder="e.g., Issue with report generation"
            placeholderTextColor={isDark ? "#94a3b8" : "#617289"}
            value={subject}
            onChangeText={setSubject}
          />
        </View>

        {/* Message Field */}
        <View style={styles.inputGroup}>
          <Text
            style={[
              styles.label,
              { color: isDark ? "#f1f5f9" : "#111418" },
            ]}
          >
            Your Message
          </Text>
          <TextInput
            style={[
              styles.textArea,
              {
                color: isDark ? "#f1f5f9" : "#111418",
                backgroundColor: isDark ? "#1e293b80" : "#ffffff",
                borderColor: isDark ? "#334155" : "#dbe0e6",
              },
            ]}
            placeholder="Please describe your issue in detail..."
            placeholderTextColor={isDark ? "#94a3b8" : "#617289"}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            value={message}
            onChangeText={setMessage}
          />
        </View>
      </ScrollView>

      {/* Footer (Toast + Button) */}
      <View
        style={[
          styles.footer,
          {
            backgroundColor: isDark ? "#101822" : "#f6f7f8",
            borderTopColor: isDark ? "#33415533" : "#dbe0e633",
          },
        ]}
      >
        {showToast && (
          <View
            style={[
              styles.toast,
              { backgroundColor: isDark ? "#16a34a33" : "#22c55e1a" },
            ]}
          >
            <MaterialIcons
              name="check-circle"
              size={20}
              color={isDark ? "#86efac" : "#16a34a"}
            />
            <Text
              style={[
                styles.toastText,
                { color: isDark ? "#bbf7d0" : "#166534" },
              ]}
            >
              Your message has been sent successfully!
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.buttonWrapper}
          activeOpacity={0.8}
          onPress={handleSend}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Send Message</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  infoText: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 20,
    marginBottom: 8,
  },
  inputGroup: {
    maxWidth: 480,
    width: "100%",
    paddingVertical: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  textArea: {
    minHeight: 120,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingTop: 15,
    fontSize: 16,
  },
  footer: {
    borderTopWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
  },
  toastText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "500",
  },
  buttonWrapper: {
    maxWidth: 480,
    width: "100%",
  },
  button: {
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#136dec",
    shadowColor: "#136dec",
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
