// TermsOfServiceScreen.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../../admin/Components/Header";

export default function TermsOfServiceScreen() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const styles = getStyles(isDark);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top App Bar */}
      <Header titleHeader="Terms of Service" />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inner}>
          {/* Introduction */}
          <Section title="Introduction" styles={styles}>
            <Text style={styles.p}>
              Welcome to Presensia. These terms and conditions outline the rules and regulations for the use of
              Presensia's Application. By accessing this app, we assume you accept these terms and conditions. Do not
              continue to use Presensia if you do not agree to take all of the terms and conditions stated on this
              page.
            </Text>
          </Section>

          {/* User Accounts & Responsibilities */}
          <Section title="User Accounts & Responsibilities" styles={styles}>
            <Text style={styles.p}>
              To use the Presensia app, you must create an account. You agree to:
            </Text>
            <View style={styles.list}>
              <Text style={styles.li}>• Provide accurate, current, and complete information during the registration process.</Text>
              <Text style={styles.li}>• Maintain the security of your password and accept all risks of unauthorized access to your account.</Text>
              <Text style={styles.li}>• Promptly notify us if you discover or otherwise suspect any security breaches related to the Service.</Text>
              <Text style={styles.li}>• Use your account solely for academic attendance purposes as intended by your institution.</Text>
            </View>
          </Section>

          {/* Acceptable Use */}
          <Section title="Acceptable Use of the Service" styles={styles}>
            <Text style={styles.p}>
              You are responsible for your use of the Presensia app. You agree not to misuse the service or help anyone
              else to do so. This includes, but is not limited to, attempting to circumvent any attendance verification
              measures, providing false location data, or interfering with the app's network or security features.
            </Text>
          </Section>

          {/* Data Privacy */}
          <Section title="Data Privacy" styles={styles}>
            <Text style={styles.p}>
              We are committed to protecting your privacy. Your personal information and attendance data are collected
              and processed in accordance with our Privacy Policy. This data is used to verify your attendance for
              academic purposes and to improve our service. We do not sell your personal data to third parties.
            </Text>
          </Section>

          {/* Termination */}
          <Section title="Termination of Service" styles={styles}>
            <Text style={styles.p}>
              We reserve the right to suspend or terminate your access to the Presensia app at any time, without notice,
              for conduct that we believe violates these Terms of Service or is harmful to other users of the app, us, or
              third parties, or for any other reason.
            </Text>
          </Section>

          {/* Changes */}
          <Section title="Changes to Terms" styles={styles}>
            <Text style={styles.p}>
              We may modify these terms from time to time. If we make material changes, we will provide you with notice
              through our service or by other means to provide you the opportunity to review the changes before they
              become effective.
            </Text>
          </Section>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Last Updated: October 26, 2023</Text>
            <Text style={[styles.footerText, { marginTop: 6 }]}>
              For any questions, please contact your university's administration.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children, styles }) {
  return (
    <View style={styles.section}>
      <Text style={styles.h2}>{title}</Text>
      <View style={{ marginTop: 8 }}>{children}</View>
    </View>
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
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)",
      backgroundColor: isDark ? "#101822" : "#f6f7f8",
    },
    backBtn: {
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 20,
    },
    headerTitle: {
      flex: 1,
      textAlign: "center",
      fontSize: 18,
      fontWeight: "700",
      color: isDark ? "#F8FAFC" : "#0f1724",
    },
    rightSpacer: {
      width: 40,
    },
    content: {
      paddingHorizontal: 16,
      paddingBottom: 40,
    },
    inner: {
      maxWidth: 760,
      width: "100%",
      alignSelf: "center",
      paddingTop: 12,
      paddingBottom: 24,
    },
    section: {
      marginTop: 18,
    },
    h2: {
      fontSize: 20,
      fontWeight: "700",
      color: isDark ? "#F8FAFC" : "#0f1724",
    },
    p: {
      marginTop: 8,
      fontSize: 15,
      lineHeight: 22,
      color: isDark ? "#cbd5e1" : "#475569",
    },
    list: {
      marginTop: 8,
    },
    li: {
      fontSize: 15,
      lineHeight: 22,
      color: isDark ? "#cbd5e1" : "#475569",
      marginVertical: 4,
    },
    footer: {
      marginTop: 28,
      borderTopWidth: 1,
      borderTopColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)",
      paddingTop: 16,
      alignItems: "center",
    },
    footerText: {
      color: isDark ? "#9CA3AF" : "#6B7280",
      fontSize: 13,
      textAlign: "center",
    },
  });
