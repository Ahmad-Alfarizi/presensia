// SecurityPassword.js
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  StyleSheet,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../Components/Header";

export default function SecurityPasswordAdmin() {
  const navigation = useNavigation();
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  // Warna dari konfigurasi Tailwind asli
  const colors = {
    primary: "#136dec",
    backgroundLight: "#f6f7f8",
    backgroundDark: "#101822",
    textLight: "#111418",
    textDark: "#ffffff",
    borderLight: "#e5e7eb",
    borderDark: "#334155",
  };

  const isDark = false; // ubah manual atau gunakan useColorScheme() untuk otomatis
  const theme = {
    background: isDark ? colors.backgroundDark : colors.backgroundLight,
    text: isDark ? colors.textDark : colors.textLight,
    subtext: isDark ? "#94a3b8" : "#64748b",
    componentBg: isDark ? "#1e293b" : "#ffffff",
    border: isDark ? colors.borderDark : colors.borderLight,
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>

      {/* Header */}
      <Header titleHeader="Security & Password"/>

      {/* Main Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.card,
            { backgroundColor: theme.componentBg, borderColor: theme.border },
          ]}
        >
          {/* Change Password */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.item, { borderBottomColor: theme.border }]}
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <View style={styles.itemLeft}>
              <View style={[styles.iconWrap, { backgroundColor: "#136dec20" }]}>
                <MaterialIcons name="lock" size={22} color={colors.primary} />
              </View>
              <Text style={[styles.itemText, { color: theme.text }]}>
                Change Password
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color={theme.subtext} />
          </TouchableOpacity>

          {/* Two-Factor Authentication */}
          <View style={styles.item}>
            <View style={styles.itemLeft}>
              <View style={[styles.iconWrap, { backgroundColor: "#136dec20" }]}>
                <MaterialIcons name="shield" size={22} color={colors.primary} />
              </View>
              <View>
                <Text style={[styles.itemText, { color: theme.text }]}>
                  Two-Factor Authentication
                </Text>
                <Text style={[styles.itemSubtext, { color: theme.subtext }]}>
                  Add an extra layer of security
                </Text>
              </View>
            </View>
            <Switch
              value={twoFactorEnabled}
              onValueChange={setTwoFactorEnabled}
              trackColor={{ false: "#d1d5db", true: colors.primary }}
              thumbColor={"#ffffff"}
            />
          </View>
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    paddingRight: 24, // agar teks tetap center
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 56,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "600",
  },
  itemSubtext: {
    fontSize: 13,
    marginTop: 2,
  },
});
