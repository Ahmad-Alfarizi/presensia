// AccountSettings.js
import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  ScrollView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../../admin/Components/Header";

export default function AccountSettings() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const settingsItems = [
    {
      id: "change-password",
      icon: "lock",
      title: "Change Password",
      onPress: () => navigation.navigate?.("ChangePassword"),
    },
    {
      id: "update-email",
      icon: "mail",
      title: "Update Email",
      onPress: () => navigation.navigate?.("UpdateEmailScreen"),
    },
  ];

  return (
    <View
      style={[
        styles.safeArea,
        { backgroundColor: isDark ? "#0b1116" : "#F8FAFC" },
      ]}
    >
      {/* Top App Bar (styled to match original) */}
       <Header titleHeader="Account Settings"/>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.containerCenter}>
          <View
            style={[
              styles.cardGroup,
              { backgroundColor: isDark ? "#0b1116" : "transparent" },
            ]}
          >
            {/* Settings items */}
            {settingsItems.map((item, idx) => (
              <TouchableOpacity
                key={item.id}
                onPress={item.onPress}
                activeOpacity={0.8}
                style={[
                  styles.item,
                  { backgroundColor: isDark ? "#111827" : "#FFFFFF" },
                ]}
              >
                <View style={styles.itemLeft}>
                  <View
                    style={[
                      styles.iconCircle,
                      { backgroundColor: isDark ? "#334155" : "#F1F5F9" },
                    ]}
                  >
                    <MaterialIcons
                      name={item.icon}
                      size={20}
                      color={isDark ? "#E2E8F0" : "#0f1724"}
                    />
                  </View>

                  <Text
                    style={[
                      styles.itemTitle,
                      { color: isDark ? "#E2E8F0" : "#0f1724" },
                    ]}
                  >
                    {item.title}
                  </Text>
                </View>

                <MaterialIcons
                  name="chevron-right"
                  size={22}
                  color={isDark ? "#94A3B8" : "#64748B"}
                />
              </TouchableOpacity>
            ))}

            {/* Divider */}
            <View
              style={[
                styles.divider,
                { borderBottomColor: isDark ? "#24303d" : "#E6EAF0" },
              ]}
            />

            {/* Delete Account */}
            <TouchableOpacity
              onPress={() => {
                // contoh: buka modal konfirmasi; untuk sekarang log ke console
                console.warn("Delete Account pressed");
              }}
              activeOpacity={0.8}
              style={[
                styles.item,
                { backgroundColor: isDark ? "#111827" : "#FFFFFF" },
              ]}
            >
              <View style={styles.itemLeft}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: "rgba(220,53,69,0.10)" },
                  ]}
                >
                  <MaterialIcons name="delete" size={20} color="#DC3545" />
                </View>

                <Text style={[styles.deleteTitle]}>Delete Account</Text>
              </View>

              <MaterialIcons
                name="chevron-right"
                size={22}
                color={isDark ? "#94A3B8" : "#64748B"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

/* Styling tuned to match original design:
   - larger rounded cards (16px+)
   - consistent vertical spacing and min-height
   - proper shadow/elevation on iOS/Android
   - centered max-width container (max 520)
*/

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topBar: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth:
      Platform.OS === "android" ? 0.5 : StyleSheet.hairlineWidth,
    borderBottomColor: "#E6EAF0",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    // keep header slightly elevated visually
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  topBarLeft: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  topBarTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
  topBarRight: {
    width: 40, // spacer so title is truly centered
    height: 40,
  },

  scroll: {
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  containerCenter: {
    alignItems: "center",
  },
  cardGroup: {
    width: "100%",
    maxWidth: 520,
  },

  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginBottom: 12,
    // shadow subtle
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 2,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
  },

  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 18,
  },

  deleteTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#DC3545",
  },
});
