// StatusBadge: small pill showing attendance status (Present / Late / Absent)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import { useLanguage } from '../context/LanguageContext';

export default function StatusBadge({ status }) {
  const { translate: t } = useLanguage();
  
  const map = {
    Present: { bg: '#E8F9F0', color: colors.success, label: t('present') },
    Late: { bg: '#FFF6E8', color: colors.warning, label: t('late') },
    Absent: { bg: '#FFF1F0', color: colors.danger, label: t('absent') }
  };
  const style = map[status] || { bg: '#F3F4F6', color: '#6B7280', label: t('unknown') };
  return (
    <View style={[styles.badge, { backgroundColor: style.bg }]}> 
      <Text style={[styles.text, { color: style.color }]}>{style.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    alignSelf: 'flex-start'
  },
  text: { fontWeight: '600', fontSize: 13 }
});
