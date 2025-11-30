// AttendanceCard: shows one attendance entry (date, class, status)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StatusBadge from './StatusBadge';
import colors from '../constants/colors';

export default function AttendanceCard({ date, subject, time, status }) {
  return (
    <View style={styles.card}>
      <View style={styles.left}> 
        <Text style={styles.subject}>{subject}</Text>
        <Text style={styles.time}>{date} • {time}</Text>
      </View>
      <View style={styles.right}>
        <StatusBadge status={status} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 12,
    marginBottom: 10
  },
  left: {},
  right: {},
  subject: { fontWeight: '700', fontSize: 15 },
  time: { color: '#6B7280', marginTop: 4 }
});
