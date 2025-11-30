import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../../hooks';
import { getErrorMessage } from '../../utils/errors';
import { logger } from '../../utils';
export default function AdminRegisterScreen({ navigation }) {
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [university, setUniversity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const handleRegister = async () => {
    // Validate input fields
    if (!fullName || !employeeId || !university || !email || !password || !confirm) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    if (password !== confirm) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password should be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      logger.info('Admin registration initiated', { email });
      // Register the admin user with Firebase
      await signUp(email, password, 'admin', {
        fullName,
        employeeId,
        university,
        role: 'admin',
        createdAt: new Date().toISOString(),
      });

      logger.info('Admin registration successful', { email });
      Alert.alert(
        'Success',
        'Admin account created successfully',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Login')
          }
        ]
      );
    } catch (error) {
      logger.error('Admin registration failed', error);
      const message = getErrorMessage(error);
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack && navigation.goBack()}
        >
          <MaterialIcons name="arrow-back" size={26} color="#111418" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Admin Registration</Text>
        <Text style={styles.subtitle}>
          Please fill in the details below to create your admin account.
        </Text>

        {/* Inputs */}
        <View style={styles.form}>
          <InputField
            icon="person"
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={setFullName}
          />
          <InputField
            icon="badge"
            label="Employee ID"
            placeholder="Enter your employee ID"
            value={employeeId}
            onChangeText={setEmployeeId}
          />
          <InputField
            icon="school"
            label="University / Department"
            placeholder="e.g., University of Technology"
            value={university}
            onChangeText={setUniversity}
          />
          <InputField
            icon="mail"
            label="Email"
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <InputField
            icon="lock"
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <InputField
            icon="lock-reset"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={confirm}
            onChangeText={setConfirm}
            secureTextEntry
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate && navigation.navigate('Login')}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const InputField = ({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
}) => (
  <View style={{ marginBottom: 16 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <MaterialIcons
        name={icon}
        size={20}
        color="#9ca3af"
        style={styles.inputIcon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f7f8' },
  scrollContainer: { flexGrow: 1, padding: 24 },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111418',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#6b7280',
    marginBottom: 32,
  },
  form: { marginBottom: 16 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingLeft: 40,
    paddingRight: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111418',
  },
  button: {
    backgroundColor: '#136dec',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: '#93c5fd',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: { marginTop: 24, alignItems: 'center' },
  footerText: { fontSize: 14, color: '#6b7280' },
  link: { color: '#136dec', fontWeight: '600' },
});
