// InputField: labeled input with icon/support for password
import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function InputField({ label, placeholder, value, onChangeText, secureTextEntry }) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 12 },
  label: { marginBottom: 6, color: '#334155', fontWeight: '600' },
  input: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E6EEF8'
  }
});
