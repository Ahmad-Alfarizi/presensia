import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useColorScheme, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../../admin/Components/Header";

export default function PrivacyPolicyScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const styles = getStyles(isDark);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header titleHeader="Privacy Policy" />


      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Introduction</Text>
          <Text style={styles.paragraph}>
            Welcome to Presensia. We are committed to protecting your privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you use our mobile application.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Information We Collect</Text>

          <Text style={styles.subheading}>Personal Identification Information</Text>
          <Text style={styles.paragraph}>
            We may collect personally identifiable information, such as your name, student ID, email address, and
            course information when you register for an account with Presensia.
          </Text>

          <Text style={styles.subheading}>Attendance Data</Text>
          <Text style={styles.paragraph}>
            We collect data related to your attendance, including timestamps, location data (if enabled for class
            check-ins), and the courses for which you are marked present or absent.
          </Text>

          <Text style={styles.subheading}>Device Information</Text>
          <Text style={styles.paragraph}>
            We may collect information about your mobile device, including the device model, operating system version,
            and unique device identifiers.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How We Use Your Information</Text>
          <Text style={styles.paragraph}>We use the information we collect to:</Text>

          <View style={styles.list}>
            <Text style={styles.listItem}>• Provide, operate, and maintain our application.</Text>
            <Text style={styles.listItem}>• Verify your identity and record your attendance for academic purposes.</Text>
            <Text style={styles.listItem}>• Communicate with you, including sending important notices and updates.</Text>
            <Text style={styles.listItem}>• Improve our application and develop new features.</Text>
            <Text style={styles.listItem}>• Share data with your educational institution for administrative purposes.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Security</Text>
          <Text style={styles.paragraph}>
            We use administrative, technical, and physical security measures to help protect your personal information.
            While we have taken reasonable steps to secure the personal information you provide to us, please be aware
            that despite our efforts, no security measures are perfect or impenetrable.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.paragraph}>
            If you have questions or comments about this Privacy Policy, please contact us at:{" "}
            <Text style={styles.link}>privacy@presensia.app</Text>
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Last Updated: October 26, 2023</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const getStyles = (isDark) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? "#101822" : "#f6f7f8",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderColor: isDark ? "#2f3844" : "#e5e7eb",
      backgroundColor: isDark ? "#101822" : "#f6f7f8",
    },
    backButton: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: isDark ? "#ffffff" : "#111418",
      textAlign: "center",
      flex: 1,
    },
    content: {
      paddingHorizontal: 16,
      paddingBottom: 40,
    },
    section: {
      marginTop: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: "700",
      color: isDark ? "#ffffff" : "#111418",
      marginBottom: 8,
    },
    subheading: {
      fontSize: 18,
      fontWeight: "600",
      color: "#136dec",
      marginTop: 16,
      marginBottom: 6,
    },
    paragraph: {
      fontSize: 15,
      lineHeight: 22,
      color: isDark ? "#d1d5db" : "#374151",
      textAlign: "justify",
    },
    list: {
      marginTop: 6,
      marginLeft: 8,
    },
    listItem: {
      fontSize: 15,
      lineHeight: 22,
      color: isDark ? "#d1d5db" : "#374151",
      marginVertical: 2,
    },
    link: {
      color: "#136dec",
      fontWeight: "500",
    },
    footer: {
      borderTopWidth: 1,
      borderColor: isDark ? "#2f3844" : "#e5e7eb",
      paddingVertical: 16,
      marginTop: 20,
    },
    footerText: {
      textAlign: "center",
      color: isDark ? "#9ca3af" : "#6b7280",
      fontSize: 13,
    },
  });
