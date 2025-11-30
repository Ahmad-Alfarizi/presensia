import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLanguage } from '../context/LanguageContext';

const LocationCard = ({ status }) => {
  const { translate: t } = useLanguage();
  
  return (
    <View style={styles.container}>
      <Text style={styles.status}>{t(status)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  status: {
    fontSize: 16,
    color: '#333',
  },
});

export default LocationCard;
