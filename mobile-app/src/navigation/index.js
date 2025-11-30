import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import SplashScreen from "../screens/SplashScreen";

// Import screens (placeholders)
import ManageNotification from "../screens/admin/Screens/Notification";
import Onboarding from "../screens/Auth/Onboarding";
import Login from "../screens/Auth/Login";
import SelectRoleScreen from "../screens/Auth/SelectedRole";
import Home from "../screens/member/Dashboard/Home";
import Attendance from "../screens/member/Dashboard/Attendance";
import History from "../screens/member/Dashboard/History";
import Profile from "../screens/member/Dashboard/Profile";
// import RegisterMember from "../screens/member/RegisterMember";
import RegisterAdmin from "../screens/admin/RegisterAdmin";
import QRScanner from "../screens/member/Dashboard/QRScanner";
import AdminDashboard from "../screens/admin/Dashboard";
import ManageSubs from "../screens/admin/Screens/ManageSubs";
import SecurityPasswordAdmin from "../screens/admin/Screens/SecurityPassword";
import LanguageSettings from "../screens/admin/Screens/LanguageSettings";
import HelpSupport from "../screens/admin/Screens/HelpSupport";
import ChangePassword from "../screens/admin/Screens/ChangePassword";
import AdminFAQ from "../screens/admin/Screens/AdminFAQ";
import UserGuide from "../screens/admin/Screens/UserGuide";
import ContactSupport from "../screens/admin/Screens/ContactSupport";

// Import User Guide detail screens
import GettingStarted from "../screens/admin/Screens/GettingStarted";
import ManagingUsers from "../screens/admin/Screens/ManagingUsers";
import CourseSchedule from "../screens/admin/Screens/CourseSchedule";
import AttendanceTracking from "../screens/admin/Screens/AttendanceTracking";
import GeneratingReports from "../screens/admin/Screens/GeneratingReports";
import AccountSettings from "../screens/member/Screens/AccountSettings";
import TroubleshootingGuide from "../screens/admin/Screens/TroubleshootingGuide";
import NotificationPreferencesScreen from "../screens/member/Screens/NotificationScreen";
import AppSettingsScreen from "../screens/member/Screens/AppSettings";
import PrivacyPolicyScreen from "../screens/member/Screens/PrivacyPolicy";
import TermsOfServiceScreen from "../screens/member/Screens/TermsOfServices";
import AboutUsScreen from "../screens/member/Screens/AboutUs";
import UpdateEmailScreen from "../screens/member/Screens/UpdateEmail";
import LoginMember from "../screens/member/LoginMember";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Attendance"
        component={Attendance}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="SelectedRole" component={SelectRoleScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="LoginMember" component={LoginMember} />
      {/* <Stack.Screen name="RegisterMember" component={RegisterMember} /> */}
      <Stack.Screen name="RegisterAdmin" component={RegisterAdmin} />
      <Stack.Screen name="QRScanner" component={QRScanner} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen name="MemberDashboard" component={MainTabs} />
      <Stack.Screen name="ManageSubs" component={ManageSubs} />
      <Stack.Screen name="Notification" component={ManageNotification} />
      <Stack.Screen
        name="SecurityPasswordAdmin"
        component={SecurityPasswordAdmin}
      />
      <Stack.Screen name="LanguageSettings" component={LanguageSettings} />
      <Stack.Screen name="HelpSupport" component={HelpSupport} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="AdminFAQ" component={AdminFAQ} />
      <Stack.Screen name="UserGuide" component={UserGuide} />
      <Stack.Screen name="ContactSupport" component={ContactSupport} />
      <Stack.Screen name="GettingStarted" component={GettingStarted} />
      <Stack.Screen name="ManagingUsers" component={ManagingUsers} />
      <Stack.Screen name="CourseSchedule" component={CourseSchedule} />
      <Stack.Screen name="AttendanceTracking" component={AttendanceTracking} />
      <Stack.Screen name="GeneratingReports" component={GeneratingReports} />
      <Stack.Screen name="AccountSettings" component={AccountSettings} />
      <Stack.Screen name="NotificationPreferencesScreen" component={NotificationPreferencesScreen} />
      <Stack.Screen name="TroubleshootingGuide" component={TroubleshootingGuide} />
      <Stack.Screen name="AppSettingsScreen" component={AppSettingsScreen} />
      <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
      <Stack.Screen name="TermsOfServiceScreen" component={TermsOfServiceScreen} />
      <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
      <Stack.Screen name="UpdateEmailScreen" component={UpdateEmailScreen} />
    </Stack.Navigator>
  );
}
