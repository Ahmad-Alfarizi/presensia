import React, { createContext, useState, useContext, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { AuthContext } from './AuthContext';

export const LanguageContext = createContext();

const translations = {
  english: {
    // App Info
    appName: "Presensia",
    welcomeUser: "Welcome, {name}",
    currentDate: "Tuesday, November 11 2025",
    contactAdmin: "Contact Your Admin",
    
    // Auth & Common
    login: "Login",
    register: "Register",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    fullName: "Full Name",
    studentId: "Student ID",
    employeeId: "Employee ID",
    university: "University",
    cancel: "Cancel",
    save: "Save Changes",
    edit: "Edit",
    delete: "Delete",
    confirm: "Confirm",
    success: "Success",
    error: "Error",
    loading: "Loading...",
    welcome: "Welcome",
    selectRole: "Select Your Role",
    logoutError: "Failed to log out. Please try again.",
    
    // Login Errors
    loginError: "An error occurred during login. Please try again.",
    noUserFound: "No user found with this email.",
    invalidPassword: "Invalid password.",
    invalidEmail: "Invalid email address.",
    fillAllFields: "Please fill in all fields.",
    permissionError: "Unable to access user data. Please try again.",
    emailPlaceholder: "Enter your email",
    passwordPlaceholder: "Enter your password",
    signIn: "Sign In",
    signingIn: "Signing in...",
    noAccount: "Don't have an account?",
    registerHere: "Register here",
    
    // Roles
    admin: "Admin",
    member: "Member",
    adminDesc: "For lecturers or staff to manage classes and attendance",
    memberDesc: "For students/employees to mark attendance and view schedules",

    // Dashboard
    dashboard: "Dashboard",
    home: "Home",
    attendance: "Attendance",
    courses: "Courses",
    reports: "Reports",
    history: "History",
    profile: "Profile",
    todayClasses: "Today's Classes",
    upcomingClasses: "Upcoming Classes",
    totalStudents: "Total Students",
    activeClasses: "Active Classes",
    attendanceRate: "Attendance Rate",
    viewAll: "View All",
    scanQR: "Scan QR",
    
    // Settings
    settings: "Settings",
    accountPlan: "Account Plan",
    currentPlan: "Current Plan",
    manageSubs: "Manage",
    generalSettings: "General Settings",
    notifications: "Notifications",
    securityPassword: "Security & Password",
    securityAndPassword: "Security & Password",
    language: "Language",
    helpSupport: "Help & Support",
    logout: "Log Out",
    logoutConfirmation: "Are you sure you want to log out?",
    
    // Notifications
    emailNotif: "Receive summaries and critical alerts via email",
    pushNotif: "Get real-time alerts sent directly to your device",
    inAppAlerts: "See less critical updates in the app's notification center",
    anomalyAlerts: "Get notified about unusual attendance patterns",
    systemUpdates: "Receive alerts about app maintenance or new features",
    
    // Security
    changePassword: "Change Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    twoFactorAuth: "Two-Factor Authentication",
    twoFactorDesc: "Add an extra layer of security",
    
    // Subscription
    premiumPlan: "Premium Plan for Institutions",
    premiumPlanInstitutions: "Premium Plan for Institutions",
    manageSubscriptionDesc: "Manage your subscription and billing details",
    planDesc: "Manage your subscription and billing details",
    basicPlan: "Basic Plan", 
    standardPlan: "Standard Plan",
    enterprisePlan: "Enterprise Plan",
    upgradePlan: "Upgrade Plan",
    downgradePlan: "Downgrade Plan",
    cancelSub: "Cancel Subscription",
    
    // Help & Support
    faq: "FAQ",
    contactSupport: "Contact Support",
    userGuide: "User Guide",
    about: "About",
    privacyPolicy: "Privacy Policy",
    terms: "Terms of Service",
    
    // Dashboard Activity
    lateAttendanceFlag: "Late Attendance Flag",
    lateAttendanceDesc: "{name} marked late for '{class}'.",
    newClassCreated: "New Class Created",
    newClassDesc: "'{className}' has been added to the schedule.",
    reportGenerated: "Report Generated",
    weeklyReportDesc: "Weekly attendance report exported.",
    timeAgo: "{time} {unit} ago",
    
    // Management
    management: "Management",
    attendanceRecords: "Attendance Records",
    viewSearchRecords: "View and search records",
    manageClasses: "Manage Classes",
    schedulesAndDetails: "Schedules and details",
    manageUsers: "Manage Users",
    studentsAndFaculty: "Students and faculty",
    generateReports: "Generate Reports",
    exportAttendanceData: "Export attendance data",
    recentActivity: "Recent Activity",
    
    // Metrics
    classesToday: "Classes Today",
    absencesToday: "Absences Today"
  },
  indonesian: {
    // App Info
    appName: "Presensia",
    welcomeUser: "Halo, {name}",
    currentDate: "Selasa, 11 November 2025",
    contactAdmin: "Hubungi Admin Kamu",
    // Auth & Common
    login: "Masuk",
    register: "Daftar",
    email: "Email",
    password: "Password",
    confirmPassword: "Konfirmasi Password",
    fullName: "Nama Lengkap",
    studentId: "NIM",
    employeeId: "ID Karyawan",
    university: "Kampus",
    cancel: "Batal",
    save: "Simpan",
    edit: "Edit",
    delete: "Hapus",
    confirm: "Konfirmasi",
    success: "Berhasil",
    error: "Error",
    loading: "Bentar ya...",
    welcome: "Selamat Datang",
    selectRole: "Pilih Peran Kamu",
    logoutError: "Gagal keluar. Coba lagi ya.",
    
    // Login Errors
    loginError: "Ada masalah saat login. Coba lagi ya.",
    noUserFound: "Email ini belum terdaftar nih.",
    invalidPassword: "Password kamu salah.",
    invalidEmail: "Format email nggak valid.",
    fillAllFields: "Isi dulu semua kolom ya.",
    permissionError: "Gabisa ambil data user nih. Coba lagi ya.",
    emailPlaceholder: "Masukkan email kamu",
    passwordPlaceholder: "Masukkan password kamu",
    signIn: "Masuk",
    signingIn: "Lagi masuk...",
    noAccount: "Belum punya akun?",
    registerHere: "Daftar di sini",
    
    // Roles
    admin: "Admin",
    member: "Anggota",
    adminDesc: "Buat dosen atau staff yang ngurus kelas dan absensi",
    memberDesc: "Buat mahasiswa/karyawan yang mau absen dan liat jadwal",

    // Dashboard
    dashboard: "Dashboard",
    home: "Beranda",
    attendance: "Absensi",
    courses: "Kelas",
    reports: "Laporan",
    history: "Riwayat",
    profile: "Profil",
    todayClasses: "Kelas Hari Ini",
    upcomingClasses: "Kelas Mendatang",
    totalStudents: "Total Mahasiswa",
    activeClasses: "Kelas Aktif",
    attendanceRate: "Tingkat Kehadiran",
    viewAll: "Lihat Semua",
    scanQR: "Scan QR",
    
    // Settings
    settings: "Pengaturan",
    accountPlan: "Paket Akun",
    currentPlan: "Paket Sekarang",
    manageSubs: "Kelola",
    generalSettings: "Pengaturan Umum",
    notifications: "Notifikasi",
    securityPassword: "Keamanan & Password",
    securityAndPassword: "Keamanan & Password",
    language: "Bahasa",
    helpSupport: "Bantuan & Dukungan",
    logout: "Keluar",
    logoutConfirmation: "Yakin mau keluar?",
    
    // Notifications
    emailNotif: "Dapetin info penting lewat email",
    pushNotif: "Notif langsung ke HP kamu",
    inAppAlerts: "Liat update yang ga terlalu penting di aplikasi",
    anomalyAlerts: "Dikabarin kalo ada yang aneh sama absensi",
    systemUpdates: "Dapet info kalo ada update atau maintenance",
    
    // Security
    changePassword: "Ganti Password",
    currentPassword: "Password Sekarang",
    newPassword: "Password Baru",
    confirmNewPassword: "Konfirmasi Password Baru",
    twoFactorAuth: "Autentikasi Dua Faktor",
    twoFactorDesc: "Tambahin pengamanan ekstra",
    
    // Subscription
    manage: "Kelola",
    premiumPlan: "Paket Premium buat Institusi",
    premiumPlanInstitutions: "Paket Premium buat Institusi",
    manageSubscriptionDesc: "Atur langganan dan detail pembayaran kamu",
    planDesc: "Atur langganan dan detail pembayaran kamu",
    basicPlan: "Paket Basic",
    standardPlan: "Paket Standar",
    enterprisePlan: "Paket Enterprise",
    upgradePlan: "Upgrade Paket",
    downgradePlan: "Downgrade Paket",
    cancelSub: "Batalin Langganan",
    
    // Help & Support
    faq: "FAQ",
    contactSupport: "Hubungi Support",
    userGuide: "Panduan Pengguna",
    about: "Tentang",
    privacyPolicy: "Kebijakan Privasi",
    terms: "Ketentuan Layanan",
    
    // Dashboard Activity
    lateAttendanceFlag: "Telat Masuk",
    lateAttendanceDesc: "{name} telat masuk kelas '{class}'.",
    newClassCreated: "Kelas Baru Dibuat",
    newClassDesc: "'{className}' udah ditambahin ke jadwal.",
    reportGenerated: "Laporan Dibuat",
    weeklyReportDesc: "Laporan absensi mingguan udah di-export.",
    timeAgo: "{time} {unit} yang lalu",
    
    // Management
    management: "Manajemen",
    attendanceRecords: "Rekap Absensi",
    viewSearchRecords: "Lihat dan cari rekap",
    manageClasses: "Kelola Kelas",
    schedulesAndDetails: "Jadwal dan detail",
    manageUsers: "Kelola Pengguna",
    studentsAndFaculty: "Mahasiswa dan dosen",
    generateReports: "Buat Laporan",
    exportAttendanceData: "Export data absensi",
    recentActivity: "Aktivitas Terbaru",
    
    // Metrics
    classesToday: "Kelas Hari Ini",
    absencesToday: "Absen Hari Ini"
  }
};

export function LanguageProvider({ children }) {
  const [language, setCurrentLanguage] = useState('english');
  const { user, loading: authLoading } = useContext(AuthContext);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (user?.uid) {
        loadLanguagePreference();
      }
      setInitialized(true);
    }
  }, [user, authLoading]);

  const loadLanguagePreference = async () => {
    try {
      const settingsRef = doc(db, 'userSettings', user.uid);
      const settingsDoc = await getDoc(settingsRef);
      
      if (settingsDoc.exists()) {
        const data = settingsDoc.data();
        if (data.language) {
          setCurrentLanguage(data.language);
          console.log('Loaded language preference:', data.language);
        }
      }
    } catch (error) {
      console.error('Error loading language preference:', error);
    }
  };

  const saveLanguagePreference = async (newLanguage) => {
    try {
      // Wait for auth to be initialized
      if (!initialized) {
        console.log('Auth not yet initialized');
        return false;
      }

      if (!user?.uid) {
        console.log('No user ID available');
        return false;
      }
      
      console.log('Saving language for user:', user.uid, 'Language:', newLanguage);
      const settingsRef = doc(db, 'userSettings', user.uid);
      
      await setDoc(settingsRef, {
        language: newLanguage,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      console.log('Language saved to Firestore successfully');
      setCurrentLanguage(newLanguage);
      return true;
    } catch (error) {
      console.error('Error saving language preference:', error);
      console.error('Error details:', error.code, error.message);
      return false;
    }
  };

  const translate = (key, params = {}) => {
    let text = translations[language]?.[key] || translations.english[key] || key;
    
    // Replace parameters in the text
    Object.entries(params).forEach(([param, value]) => {
      text = text.replace(`{${param}}`, value);
    });
    
    return text;
  };

  const contextValue = {
    language,
    setLanguage: saveLanguagePreference,
    translate,
    initialized
  };

  console.log('LanguageContext current value:', contextValue);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);