// NotificationSettings.js
import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../Components/Header";
import { useAuth } from "../../../hooks";
import { db } from "../../../config/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
export default function ManageNotification({ navigation }) {
  const { user, isAuthenticated } = useAuth();
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [inAppEnabled, setInAppEnabled] = useState(false);
  const [anomalyEnabled, setAnomalyEnabled] = useState(true);
  const [systemUpdatesEnabled, setSystemUpdatesEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Load notification settings on component mount
   * Only load if user is authenticated
   */
  useEffect(() => {
    if (isAuthenticated && user?.uid) {
      loadNotificationSettings();
    }
  }, [isAuthenticated, user?.uid]);

  const loadNotificationSettings = async () => {
    try {
      if (!user?.uid) {
        console.log('User data not ready yet');
        setLoading(false);
        return;
      }

      const notificationRef = doc(db, 'userSettings', user.uid);
      
      try {
        const notificationDoc = await getDoc(notificationRef);
        
        if (notificationDoc.exists()) {
          const data = notificationDoc.data();
          setEmailEnabled(data.emailEnabled ?? true);
          setPushEnabled(data.pushEnabled ?? true);
          setInAppEnabled(data.inAppEnabled ?? false);
          setAnomalyEnabled(data.anomalyEnabled ?? true);
          setSystemUpdatesEnabled(data.systemUpdatesEnabled ?? false);
        } else {
          // Set default settings if no document exists
          const defaultSettings = {
            emailEnabled: true,
            pushEnabled: true,
            inAppEnabled: false,
            anomalyEnabled: true,
            systemUpdatesEnabled: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            userId: user.uid,
            userEmail: user.email
          };

          try {
            await setDoc(notificationRef, defaultSettings);
            // Apply default settings to state
            setEmailEnabled(true);
            setPushEnabled(true);
            setInAppEnabled(false);
            setAnomalyEnabled(true);
            setSystemUpdatesEnabled(false);
          } catch (writeError) {
            console.error('Error creating default settings:', writeError);
            if (writeError.code === 'permission-denied') {
              Alert.alert(
                'Permission Error',
                'You do not have permission to modify notification settings. Please contact support.'
              );
            }
          }
        }
      } catch (readError) {
        console.error('Error reading notification settings:', readError);
        if (readError.code === 'permission-denied') {
          Alert.alert(
            'Permission Error',
            'You do not have permission to access notification settings. Please contact support.'
          );
        } else {
          throw readError;
        }
      }
    } catch (error) {
      console.error('Error loading notification settings:', error);
      Alert.alert(
        'Error',
        'Failed to load notification settings. Please try again later.'
      );
    }
  };

  const saveNotificationSettings = async (setting, value) => {
    try {
      if (!user?.uid) {
        console.log('No authenticated user found');
        navigation.replace('Login');
        return;
      }

      const notificationRef = doc(db, 'userSettings', user.uid);
      const updatedSettings = {
        emailEnabled,
        pushEnabled,
        inAppEnabled,
        anomalyEnabled,
        systemUpdatesEnabled,
        [setting]: value,
        updatedAt: new Date().toISOString(),
        userId: user.uid,
        userEmail: user.email,
        role: user.role || 'admin'
      };

      try {
        await setDoc(notificationRef, updatedSettings, { merge: true });
      } catch (error) {
        console.error('Error saving notification settings:', error);
        if (error.code === 'permission-denied') {
          Alert.alert(
            'Permission Error',
            'You do not have permission to update notification settings.'
          );
        } else {
          Alert.alert('Error', 'Failed to save notification settings');
        }
        throw error;
      }
    } catch (error) {
      console.error('Error in saveNotificationSettings:', error);
    }
  };

  const handleToggle = (setting, value) => {
    switch(setting) {
      case 'emailEnabled':
        setEmailEnabled(value);
        break;
      case 'pushEnabled':
        setPushEnabled(value);
        break;
      case 'inAppEnabled':
        setInAppEnabled(value);
        break;
      case 'anomalyEnabled':
        setAnomalyEnabled(value);
        break;
      case 'systemUpdatesEnabled':
        setSystemUpdatesEnabled(value);
        break;
    }
    saveNotificationSettings(setting, value);
  };

  // colors roughly matching original tailwind config
  const colors = {
    primary: "#136dec",
    backgroundLight: "#f6f7f8",
    backgroundDark: "#101822",
    textLight: "#111418",
    textDark: "#ffffff",
    subtextLight: "#617289",
    subtextDark: "#94a3b8",
    borderLight: "#e5e7eb",
    borderDark: "#334155",
    componentBgLight: "#ffffff",
    componentBgDark: "#1e293b",
    iconBgLight: "#f0f2f4",
    iconBgDark: "#334155",
  };

  // For simplicity, detect dark mode via StatusBar style isn't perfect;
  // you can replace with useColorScheme() if you want system theme.
  const isDark = false; // set to true to preview dark styling; or use useColorScheme()

  const theme = {
    background: isDark ? colors.backgroundDark : colors.backgroundLight,
    componentBg: isDark ? colors.componentBgDark : colors.componentBgLight,
    text: isDark ? colors.textDark : colors.textLight,
    subtext: isDark ? colors.subtextDark : colors.subtextLight,
    border: isDark ? colors.borderDark : colors.borderLight,
    iconBg: isDark ? colors.iconBgDark : colors.iconBgLight,
  };

  const Row = ({ icon, title, subtitle, value, onValueChange }) => (
    <View style={[styles.rowContainer]}>
      <View style={[styles.iconWrap, { backgroundColor: theme.iconBg }]}>
        <Text style={[styles.iconText]}>{icon}</Text>
      </View>
      <View style={styles.rowTextWrap}>
        <Text style={[styles.rowTitle, { color: theme.text }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.rowSubtitle, { color: theme.subtext }]}>
            {subtitle}
          </Text>
        ) : null}
      </View>
      <View style={styles.rowToggle}>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: "#d1d5db", true: colors.primary }}
          thumbColor={"#ffffff"}
        />
      </View>
    </View>
  );

  return (
    <View style={[styles.safeArea, { backgroundColor: theme.background }]}>

      <View style={[styles.container]}>
        {/* Top App Bar */}
        <Header titleHeader="Notification" />
        {/* Content */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Group 1 */}
          <View
            style={[
              styles.card,
              { backgroundColor: theme.componentBg, borderColor: theme.border },
            ]}
          >
            <Row
              icon={"📧"}
              title={"Email Notifications"}
              subtitle={"Receive summaries and critical alerts via email."}
              value={emailEnabled}
              onValueChange={(value) => handleToggle('emailEnabled', value)}
            />
            <View
              style={[
                styles.hr,
                { borderBottomColor: theme.border, marginLeft: 72 },
              ]}
            />
            <Row
              icon={"🔔"}
              title={"Push Notifications"}
              subtitle={"Get real-time alerts sent directly to your device."}
              value={pushEnabled}
              onValueChange={(value) => handleToggle('pushEnabled', value)}
            />
            <View
              style={[
                styles.hr,
                { borderBottomColor: theme.border, marginLeft: 72 },
              ]}
            />
            <Row
              icon={"💬"}
              title={"In-App Alerts"}
              subtitle={
                "See less critical updates in the app's notification center."
              }
              value={inAppEnabled}
              onValueChange={(value) => handleToggle('inAppEnabled', value)}
            />
          </View>

          {/* Group 2 */}
          <View
            style={[
              styles.card,
              { backgroundColor: theme.componentBg, borderColor: theme.border },
            ]}
          >
            <Row
              icon={"⚠️"}
              title={"Attendance Anomaly Alerts"}
              subtitle={"Get notified about unusual attendance patterns."}
              value={anomalyEnabled}
              onValueChange={(value) => handleToggle('anomalyEnabled', value)}
            />
            <View
              style={[
                styles.hr,
                { borderBottomColor: theme.border, marginLeft: 72 },
              ]}
            />
            <Row
              icon={"🖥️"}
              title={"System Updates"}
              subtitle={"Receive alerts about app maintenance or new features."}
              value={systemUpdatesEnabled}
              onValueChange={(value) => handleToggle('systemUpdatesEnabled', value)}
            />
          </View>

          {/* Additional spacing */}
          <View style={{ height: 24 }} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  appBar: {
    height: 56,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    flexDirection: "row",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 20,
  },
  appTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
  rightSpacer: {
    width: 40,
  },

  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingTop: 12,
    paddingBottom: 40,
  },

  card: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 72,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 12,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  iconText: {
    fontSize: 20,
  },
  rowTextWrap: {
    flex: 1,
    paddingRight: 12,
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  rowSubtitle: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "400",
  },
  rowToggle: {
    marginLeft: 8,
  },

  hr: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
