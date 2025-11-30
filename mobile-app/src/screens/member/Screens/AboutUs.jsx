import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../../admin/Components/Header";

export default function AboutUsScreen() {
  const theme = useColorScheme();
  const navigation = useNavigation();
  const isDark = theme === "dark";

  const colors = {
    primary: "#136dec",
    background: isDark ? "#101822" : "#f6f7f8",
    card: isDark ? "rgba(39,39,42,0.5)" : "#ffffff",
    text: isDark ? "#f1f5f9" : "#111418",
    textMuted: isDark ? "#94a3b8" : "#617289",
    border: isDark ? "#334155" : "#e2e8f0",
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <Header titleHeader="About Us" />

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* App Logo */}
        <View style={styles.logoContainer}>
          <View
            style={[styles.logoBox, { backgroundColor: colors.primary }]}
          >
            <MaterialIcons name="checklist" size={48} color="#fff" />
          </View>
          <Text style={[styles.appName, { color: colors.text }]}>
            Presensia
          </Text>
          <Text style={[styles.appVersion, { color: colors.textMuted }]}>
            Version 1.0.2
          </Text>
        </View>

        {/* Content Card */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          {/* Our Mission */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.primary }]}>
              Our Mission
            </Text>
            <Text style={[styles.sectionText, { color: colors.text }]}>
              To simplify and modernize the attendance process for students and
              educational institutions, making it seamless, efficient, and
              reliable.
            </Text>
          </View>

          {/* About the Application */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.primary }]}>
              About the Application
            </Text>
            <Text style={[styles.sectionText, { color: colors.text }]}>
              Presensia leverages modern technology to provide a fast, secure,
              and user-friendly platform for attendance tracking. Our app is
              designed to eliminate manual processes, reduce errors, and provide
              real-time insights for both students and faculty.
            </Text>
          </View>

          {/* Meet the Team */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.primary }]}>
              Meet the Team
            </Text>
            <Text style={[styles.sectionText, { color: colors.text }]}>
              We are a passionate team of developers and designers committed to
              enhancing the educational experience through innovative
              technology. Our goal is to create tools that empower students and
              educators alike.
            </Text>
          </View>
        </View>

        {/* Footer Links */}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("TermsOfService")}
          >
            <Text style={[styles.link, { color: colors.primary }]}>
              Terms of Service
            </Text>
          </TouchableOpacity>
          <Text style={[styles.dot, { color: colors.textMuted }]}>·</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("PrivacyPolicy")}
          >
            <Text style={[styles.link, { color: colors.primary }]}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
  scrollContent: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  logoBox: {
    width: 96,
    height: 96,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    marginBottom: 12,
  },
  appName: { fontSize: 28, fontWeight: "700" },
  appVersion: { fontSize: 14, fontWeight: "400" },
  card: {
    borderWidth: 1,
    borderRadius: 14,
    overflow: "hidden",
  },
  section: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "transparent",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
    gap: 10,
  },
  link: { fontSize: 14, fontWeight: "600" },
  dot: { fontSize: 16 },
});
