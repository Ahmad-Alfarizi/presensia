// AppSettingsScreen.js
import React, { useState, useMemo } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
  useColorScheme,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useLanguage } from "../../../context/LanguageContext";
import Header from "../../admin/Components/Header";
export default function AppSettingsScreen() {
  const navigation = useNavigation();
  const systemColorScheme = useColorScheme(); // 'light' | 'dark' | null
  const [overrideDark, setOverrideDark] = useState(null); // null = follow system, true/false = override
  const { translate: t } = useLanguage();
  // effective theme
  const isDark = useMemo(() => {
    if (overrideDark === null) {
      return systemColorScheme === "dark";
    }
    return !!overrideDark;
  }, [systemColorScheme, overrideDark]);

  // handler for appearance switch. When user toggles, we set override.
  const handleToggleDarkMode = (val) => {
    // if currently following system and turning on, set override to true
    setOverrideDark(val);
  };

  const infoItems = [
    {
      id: "Language",
      title: "Language",
      icon: "language",
      onPress: () => {
        // wire to navigation if needed
        navigation.navigate("LanguageSettings");
      },
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: "policy",
      onPress: () => {
        // wire to navigation if needed
        navigation.navigate("PrivacyPolicyScreen");
      },
    },
    {
      id: "terms",
      title: "Terms of Service",
      icon: "gavel",
      onPress: () => {
        navigation.navigate("TermsOfServiceScreen");
      },
    },
    {
      id: "about",
      title: "About Us",
      icon: "info",
      onPress: () => {
        navigation.navigate("AboutUsScreen");
      },
    },
  ];

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: isDark ? COLORS.bgDark : COLORS.bgLight },
      ]}
    >
      {/* Top App Bar */}
      <Header titleHeader="Settings" />

      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Appearance Section */}
        <View>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: isDark
                  ? COLORS.textDarkSecondary
                  : COLORS.textLightSecondary,
              },
            ]}
          >
            Appearance
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: isDark ? COLORS.cardDark : COLORS.cardLight,
                borderColor: isDark ? COLORS.borderDark : COLORS.borderLight,
              },
            ]}
          >
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <View
                  style={[
                    styles.iconBox,
                    {
                      backgroundColor: isDark ? COLORS.bgDark : COLORS.bgLight,
                    },
                  ]}
                >
                  <MaterialIcons
                    name="contrast"
                    size={22}
                    color={
                      isDark ? COLORS.textDarkPrimary : COLORS.textLightPrimary
                    }
                  />
                </View>
                <Text
                  style={[
                    styles.rowTitle,
                    {
                      color: isDark
                        ? COLORS.textDarkPrimary
                        : COLORS.textLightPrimary,
                    },
                  ]}
                >
                  Dark Mode
                </Text>
              </View>

              <View style={styles.rowRight}>
                {/* Switch: toggles override; when user toggles we set overrideDark */}
                <Switch
                  value={isDark}
                  onValueChange={(val) => handleToggleDarkMode(val)}
                  trackColor={{ false: "#d1d5db", true: COLORS.primary }}
                  thumbColor={"#fff"}
                  ios_backgroundColor="#d1d5db"
                />
              </View>
            </View>

            <Text
              style={[
                styles.rowHint,
                {
                  color: isDark
                    ? COLORS.textDarkSecondary
                    : COLORS.textLightSecondary,
                },
              ]}
            >
              {overrideDark === null
                ? "Following system preference"
                : "Using app preference"}
            </Text>
          </View>
          
        </View>

        {/* Information Section */}
        <View style={{ marginTop: 20 }}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: isDark
                  ? COLORS.textDarkSecondary
                  : COLORS.textLightSecondary,
              },
            ]}
          >
            Information
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: isDark ? COLORS.cardDark : COLORS.cardLight,
                borderColor: isDark ? COLORS.borderDark : COLORS.borderLight,
              },
            ]}
          >
            {infoItems.map((it, idx) => (
              <View key={it.id}>
                <TouchableOpacity
                  activeOpacity={0.75}
                  style={styles.row}
                  onPress={it.onPress}
                >
                  <View style={styles.rowLeft}>
                    <View
                      style={[
                        styles.iconBox,
                        {
                          backgroundColor: isDark
                            ? COLORS.bgDark
                            : COLORS.bgLight,
                        },
                      ]}
                    >
                      <MaterialIcons
                        name={it.icon}
                        size={22}
                        color={
                          isDark
                            ? COLORS.textDarkPrimary
                            : COLORS.textLightPrimary
                        }
                      />
                    </View>
                    <Text
                      style={[
                        styles.rowTitle,
                        {
                          color: isDark
                            ? COLORS.textDarkPrimary
                            : COLORS.textLightPrimary,
                        },
                      ]}
                    >
                      {it.title}
                    </Text>
                  </View>

                  <MaterialIcons
                    name="chevron-right"
                    size={22}
                    color={
                      isDark
                        ? COLORS.textDarkSecondary
                        : COLORS.textLightSecondary
                    }
                  />
                </TouchableOpacity>

                {idx < infoItems.length - 1 ? (
                  <View
                    style={[
                      styles.divider,
                      {
                        backgroundColor: isDark
                          ? COLORS.borderDark
                          : COLORS.borderLight,
                      },
                    ]}
                  />
                ) : null}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* Colors used in styles (kept near original Tailwind palette) */
const COLORS = {
  primary: "#136dec",
  bgLight: "#f6f7f8",
  bgDark: "#101822",
  cardLight: "#ffffff",
  cardDark: "#19222c",
  textLightPrimary: "#111418",
  textDarkPrimary: "#f0f2f4",
  textLightSecondary: "#6b7280",
  textDarkSecondary: "#9ca3af",
  borderLight: "#e5e7eb",
  borderDark: "#374151",
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topBar: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth:
      Platform.OS === "android" ? 0.5 : StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  topBarButton: {
    position: "absolute",
    left: 12,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  topBarSpacer: {
    position: "absolute",
    right: 12,
    width: 40,
    height: 40,
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    paddingHorizontal: 4,
    marginBottom: 8,
  },

  card: {
    borderWidth: 1,
    borderRadius: 14,
    overflow: "hidden",
  },

  row: {
    minHeight: 64,
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  rowTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  rowHint: {
    fontSize: 12,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 68,
  },

  deleteText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#DC3545",
  },
});
