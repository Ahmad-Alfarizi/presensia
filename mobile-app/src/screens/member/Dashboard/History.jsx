// Attendance history screen with calendar placeholder and logs
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import GlobalStyles from '../../../styles/GlobalStyles';
import AttendanceCard from '../../../components/AttendanceCard';
import api from '../../../services/api';
import colors from '../../../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { logger } from '../../../utils';
export default function History() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filteredLogs, setFilteredLogs] = useState([]);

  const loadLogs = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) setLoading(true);
      setError(null);
      const data = await api.fetchAttendanceHistory();
      logger.debug('Attendance history loaded', { count: data.length });
      setLogs(data);
    } catch (e) {
      logger.error('Failed to load attendance history', e);
      setError('Could not load attendance history');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  useEffect(() => {
    if (logs.length > 0) {
      const filtered = logs.filter(log => {
        const logDate = new Date(log.timestamp);
        return logDate.toDateString() === selectedDate.toDateString();
      });
      setFilteredLogs(filtered);
    }
  }, [logs, selectedDate]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadLogs(true);
  }, []);

  return (
    <View style={styles.container}>
      {/* Top App Bar */}
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerTitle}>Attendance History</Text>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="filter-list" size={24} color="#212529" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Main Content */}
      <ScrollView 
        style={styles.main}
        contentContainerStyle={styles.mainContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Calendar Picker */}
        <View style={styles.calendarCard}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity style={styles.chevronButton}>
              <MaterialIcons name="chevron-left" size={28} color="#212529" />
            </TouchableOpacity>
            <Text style={styles.calendarMonth}>October 2024</Text>
            <TouchableOpacity style={styles.chevronButton}>
              <MaterialIcons name="chevron-right" size={28} color="#212529" />
            </TouchableOpacity>
          </View>

          {/* Days Header */}
          <View style={styles.weekRow}>
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <Text key={i} style={styles.weekText}>{d}</Text>
            ))}
          </View>

          {/* Example Dates */}
          <View style={styles.dateGrid}>
            {[...Array(31)].map((_, i) => (
              <TouchableOpacity key={i} style={styles.dateButton}>
                <View style={[
                  styles.dateInner,
                  i + 1 === 14 ? styles.dateActive : null
                ]}>
                  <Text style={[
                    styles.dateText,
                    i + 1 === 14 ? styles.dateTextActive : null
                  ]}>
                    {i + 1}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Log Summary */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Log Summary for 14 Oct 2024</Text>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.statusPresent}>Present</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Check-in</Text>
            <Text style={styles.value}>08:55 AM</Text>
          </View>
          <View style={styles.cardRow}>
            <Text style={styles.label}>Check-out</Text>
            <Text style={styles.value}>16:02 PM</Text>
          </View>
        </View>

        {/* Daily Logs */}
        <Text style={styles.sectionTitle}>Daily Logs</Text>

        {/* Present */}
        <View style={styles.logCard}>
          <View style={[styles.logIconContainer, { backgroundColor: '#D1FAE5' }]}>
            <MaterialIcons name="task-alt" size={28} color="#16A34A" />
          </View>
          <View style={styles.logInfo}>
            <Text style={styles.logTitle}>Advanced Calculus</Text>
            <Text style={styles.logSub}>09:00 AM - Main Campus</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: '#D1FAE5' }]}>
            <Text style={[styles.statusBadgeText, { color: '#065F46' }]}>Present</Text>
          </View>
        </View>

        {/* Late */}
        <View style={styles.logCard}>
          <View style={[styles.logIconContainer, { backgroundColor: '#FEF9C3' }]}>
            <MaterialIcons name="hourglass-top" size={28} color="#CA8A04" />
          </View>
          <View style={styles.logInfo}>
            <Text style={styles.logTitle}>Organic Chemistry Lab</Text>
            <Text style={styles.logSub}>11:15 AM - Online Class</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: '#FEF9C3' }]}>
            <Text style={[styles.statusBadgeText, { color: '#854D0E' }]}>Late</Text>
          </View>
        </View>

        {/* Absent */}
        <View style={styles.logCard}>
          <View style={[styles.logIconContainer, { backgroundColor: '#FEE2E2' }]}>
            <MaterialIcons name="cancel" size={28} color="#DC2626" />
          </View>
          <View style={styles.logInfo}>
            <Text style={styles.logTitle}>Literary Theory</Text>
            <Text style={styles.logSub}>14:00 PM - Main Campus</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: '#FEE2E2' }]}>
            <Text style={[styles.statusBadgeText, { color: '#991B1B' }]}>Absent</Text>
          </View>
        </View>

        {/* Empty State */}
        <View style={styles.emptyCard}>
          <MaterialIcons name="event-busy" size={56} color="#9CA3AF" />
          <Text style={styles.emptyTitle}>No Records Found</Text>
          <Text style={styles.emptyDesc}>
            There are no attendance records for the selected date. Try choosing another day.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FA' 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#212529' 
  },
  iconButton: { 
    padding: 8 
  },
  main: { 
    flex: 1,
  },
  mainContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 100,
  },
  calendarCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  chevronButton: {
    padding: 4,
  },
  calendarMonth: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#212529' 
  },
  weekRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginTop: 12,
    marginBottom: 8,
  },
  weekText: { 
    color: '#6C757D', 
    fontWeight: '600', 
    fontSize: 12 
  },
  dateGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  dateButton: { 
    width: '14%', 
    marginVertical: 4,
    alignItems: 'center',
  },
  dateInner: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 36,
    width: 36,
    borderRadius: 18,
  },
  dateActive: { 
    backgroundColor: '#007BFF' 
  },
  dateText: { 
    fontSize: 13, 
    color: '#212529',
    fontWeight: '500',
  },
  dateTextActive: { 
    color: '#FFF', 
    fontWeight: 'bold' 
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardTitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#212529', 
    marginBottom: 12 
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  label: { 
    color: '#6C757D', 
    fontSize: 14,
    fontWeight: '500',
  },
  value: { 
    color: '#212529', 
    fontSize: 14,
    fontWeight: '500',
  },
  statusPresent: { 
    color: '#16A34A', 
    fontWeight: '600', 
    fontSize: 14 
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    marginBottom: 12, 
    color: '#212529' 
  },
  logCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  logIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  logInfo: { 
    flex: 1 
  },
  logTitle: { 
    fontWeight: '600', 
    color: '#212529',
    fontSize: 14,
  },
  logSub: { 
    fontSize: 12, 
    color: '#6C757D',
    marginTop: 2,
  },
  statusBadge: {
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    flexShrink: 0,
  },
  statusBadgeText: { 
    fontSize: 11, 
    fontWeight: '600' 
  },
  emptyCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    marginVertical: 32,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  emptyTitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#212529', 
    marginTop: 12 
  },
  emptyDesc: {
    textAlign: 'center',
    color: '#6C757D',
    fontSize: 13,
    marginTop: 8,
    lineHeight: 20,
  },
});