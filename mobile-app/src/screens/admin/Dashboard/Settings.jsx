import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../hooks";
import { useLanguage } from "../../../context/LanguageContext";
import { getErrorMessage } from "../../../utils/errors";
import { logger } from "../../../utils";
const screenWidth = Dimensions.get("window").width - 32;

export default function Settings() {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  const { translate: t } = useLanguage();

  const handleLogout = () => {
    Alert.alert(
      t('logout'),
      t('logoutConfirmation'),
      [
        {
          text: t('cancel'),
          style: "cancel"
        },
        {
          text: t('logout'),
          style: "destructive",
          onPress: async () => {
            try {
              logger.info('Admin initiating logout');
              await signOut();
              logger.info('Admin logged out successfully');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              logger.error('Logout error', error);
              const message = getErrorMessage(error);
              Alert.alert(t('error'), message);
            }
          }
        }
      ]
    );
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView>
        <View style={styles.header}>
          {/* <Ionicons name="arrow-back" size={24} color="#111418" /> */}
          <Text style={styles.headerTitle}>{t('settings')}</Text>
        </View>
      </SafeAreaView>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Account Plan */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('accountPlan')}</Text>
          <View style={styles.card}>
            <Text style={styles.label}>{t('currentPlan')}:</Text>
            <Text style={styles.planTitle}>{t('premiumPlanInstitutions')}</Text>
            <View style={styles.planFooter}>
              <Text style={styles.planDesc}>
                {t('manageSubscriptionDesc')}
              </Text>
              <TouchableOpacity style={styles.manageButton}
                onPress={() => navigation.navigate("ManageSubs")}
              >
                <Text style={styles.manageText}>{t('manage')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* General Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('generalSettings')}</Text>

          {/* Notifications */}
          <TouchableOpacity style={styles.listItem}
            onPress={() => navigation.navigate("Notification")}
          >
            <View style={styles.listLeft}>
              <View style={styles.iconCircle}>
                <MaterialIcons name="notifications" size={20} color="#444" />
              </View>
              <Text style={styles.listText}>{t('notifications')}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#aaa" />
          </TouchableOpacity>

          {/* Security & Password */}
          <TouchableOpacity style={styles.listItem}
            onPress={() => navigation.navigate("SecurityPasswordAdmin")}
          >
            <View style={styles.listLeft}>
              <View style={styles.iconCircle}>
                <MaterialIcons name="shield" size={20} color="#444" />
              </View>
              <Text style={styles.listText}>{t('securityAndPassword')}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#aaa" />
          </TouchableOpacity>

          {/* Language */}
          <TouchableOpacity style={styles.listItem}
            onPress={() => navigation.navigate("LanguageSettings")}
          >
            <View style={styles.listLeft}>
              <View style={styles.iconCircle}>
                <MaterialIcons name="language" size={20} color="#444" />
              </View>
              <Text style={styles.listText}>{t('language')}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#aaa" />
          </TouchableOpacity>

          {/* Help & Support */}
          <TouchableOpacity style={[styles.listItem, { borderBottomWidth: 0 }]}
            onPress={() => navigation.navigate("HelpSupport")}
          >
            <View style={styles.listLeft}>
              <View style={styles.iconCircle}>
                <MaterialIcons name="help-outline" size={20} color="#444" />
              </View>
              <Text style={styles.listText}>{t('helpSupport')}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#aaa" />
          </TouchableOpacity>

            {/* LogOut*/}
          <TouchableOpacity 
            style={[styles.listItem, { borderBottomWidth: 0 }]}
            onPress={handleLogout}
          >
            <View style={styles.listLeft}>
              <View style={styles.iconCircle}>
                <MaterialIcons name="logout" size={20} color="#e90f0fff" />
              </View>
              <Text style={[styles.listText, { color: "#e90f0fff" }]}>{t('logout')}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#aaa" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F8FA" },
  header: {
    flexDirection: "row",
    alignItems: "start",
    // justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    elevation: 2,
  },
  headerTitle: { fontSize: 18, fontWeight: "700", color: "#111418" },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  label: {
    color: "#777",
    fontSize: 14,
  },
  planTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111",
    marginTop: 4,
  },
  planFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  planDesc: {
    color: "#777",
    fontSize: 13,
    flex: 1,
    marginRight: 10,
  },
  manageButton: {
    backgroundColor: "#136dec",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  manageText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 14,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 64,
    borderBottomWidth: 1,
    borderColor: "#e6e6e6",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  listLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  listText: {
    fontSize: 16,
    color: "#222",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
});
