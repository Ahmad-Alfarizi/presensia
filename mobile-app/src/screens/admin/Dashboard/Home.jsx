import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import TopBar from "../Components/TopBar";
import MetricCard from "../Components/MetricCard";
import ManagementCard from "../Components/ManagementCard";
import ActivityItem from "../Components/ActivityItem";
import FloatingButton from "../Components/FloatingButton";
import { useLanguage } from "../../../context/LanguageContext";

export default function AdminHome() {
  const { translate: t } = useLanguage();
  
  return (
    <View style={styles.container}>
      <TopBar />
      <ScrollView style={styles.content}>
        <View>
          <Text style={styles.welcome}>{t('welcomeUser', { name: 'Alex' })}</Text>
          <Text style={styles.subtext}>{t('currentDate')}</Text>
        </View>

        {/* Metrics */}
        <View style={styles.metricsContainer}>
          <MetricCard icon="groups" label={t('totalStudents')} value="850" />
          <MetricCard icon="event-available" label={t('classesToday')} value="12" />
          <MetricCard icon="pie-chart" label={t('attendanceRate')} value="92%" color="#50E3C2" />
          <MetricCard icon="person-off" label={t('absencesToday')} value="8" color="#E94E77" />
        </View>

        {/* Management */}
        <Text style={styles.sectionTitle}>{t('management')}</Text>
        <ManagementCard icon="checklist" title={t('attendanceRecords')} subtitle={t('viewSearchRecords')} />
        <ManagementCard icon="calendar-month" title={t('manageClasses')} subtitle={t('schedulesAndDetails')} />
        <ManagementCard icon="school" title={t('manageUsers')} subtitle={t('studentsAndFaculty')} />
        <ManagementCard icon="assessment" title={t('generateReports')} subtitle={t('exportAttendanceData')} />

        {/* Recent Activity */}
        <Text style={styles.sectionTitle}>{t('recentActivity')}</Text>
        <View style={{ gap: 12, marginBottom: 80 }}>
          <ActivityItem
            icon="flag"
            color="#E94E77"
            title={t('lateAttendanceFlag')}
            description={t('lateAttendanceDesc', { name: 'John Doe', class: 'Calculus I' })}
            time={t('timeAgo', { time: '5', unit: 'min' })}
          />
          <ActivityItem
            icon="add-circle"
            color="#4A90E2"
            title={t('newClassCreated')}
            description={t('newClassDesc', { className: 'Advanced Physics' })}
            time={t('timeAgo', { time: '1', unit: 'hour' })}
          />
          <ActivityItem
            icon="download-done"
            color="#50E3C2"
            title={t('reportGenerated')}
            description={t('weeklyReportDesc')}
            time={t('timeAgo', { time: '3', unit: 'hours' })}
          />
        </View>
      </ScrollView>
      {/* <FloatingButton onPress={() => console.log("Add pressed")} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  content: {
    padding: 16,
  },
  welcome: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111418",
  },
  subtext: {
    color: "#617289",
    marginTop: 4,
  },
  metricsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111418",
    marginTop: 24,
    marginBottom: 8,
  },
});
