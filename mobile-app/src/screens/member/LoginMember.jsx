// Login screen for students
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import InputField from '../../components/InputField';
import { useAuth } from '../../hooks';
import colors from '../../constants/colors';
import PrimaryButton from '../../components/PrimaryButton';
import { useLanguage } from '../../context/LanguageContext';
import { getErrorMessage } from '../../utils/errors';
import { logger } from '../../utils';
import { userStorage } from '../../utils/storage';

export default function LoginMember({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentEmail, setRecentEmail] = useState(null);
  const { signIn } = useAuth();
  const { translate: t } = useLanguage();

  /**
   * Load recent login email on component mount
   */
  useEffect(() => {
    loadRecentLogin();
  }, []);

  /**
   * Load recently used email from storage
   */
  const loadRecentLogin = async () => {
    try {
      const userData = await userStorage.getUserData();
      if (userData?.email) {
        setRecentEmail(userData.email);
      }
    } catch (error) {
      logger.debug('Could not load recent login', error);
    }
  };

  /**
   * Use recent email
   */
  const handleUseRecentEmail = () => {
    if (recentEmail) {
      setEmail(recentEmail);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(t('error'), t('fillAllFields'));
      return;
    }

    setLoading(true);
    try {
      logger.info('Attempting to sign in', { email });
      const signedUser = await signIn(email, password);
      logger.debug('Sign in response', { user: signedUser });

      if (!signedUser) {
        logger.error('No user data returned from signIn', { email });
        throw new Error('Login failed');
      }

      if (!signedUser.role) {
        logger.error('No role found in user data', { user: signedUser });
        throw new Error('User role not found');
      }

      // If the signed in user has role 'admin', redirect to admin dashboard
      if (signedUser.role === 'admin') {
        navigation.replace('AdminDashboard');
      } else if (signedUser.role === 'member') {
        navigation.replace('MemberDashboard');
      } else {
        logger.error('Invalid role found', { role: signedUser.role });
        throw new Error('Invalid user role');
      }
    } catch (error) {
      logger.error('Login error', error);
      
      const message = getErrorMessage(error);
      Alert.alert(t('error'), message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('signIn')}</Text>
      <InputField 
        label={t('email')}
        placeholder={t('emailPlaceholder')}
        value={email} 
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {recentEmail && (
        <TouchableOpacity 
          style={styles.recentEmailButton}
          onPress={handleUseRecentEmail}
        >
          <Text style={styles.recentEmailLabel}>{t('lastEmail') || 'Last Email'}</Text>
          <Text style={styles.recentEmailValue}>{recentEmail}</Text>
        </TouchableOpacity>
      )}
      <InputField 
        label={t('password')}
        placeholder={t('passwordPlaceholder')}
        secureTextEntry 
        value={password} 
        onChangeText={setPassword}
      />
      <PrimaryButton 
        title={loading ? t('signingIn') : t('signIn')}
        onPress={handleLogin}
        disabled={loading}
      />
      {loading && (
        <ActivityIndicator 
          size="large" 
          color={colors.primary} 
          style={styles.loader}
        />
      )}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>{t('noAccount')} </Text>
        <Text style={styles.registerLink}>
          {t('contactAdmin')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: colors.lightGray },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 16 },
  recentEmailButton: {
    marginVertical: 12,
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  recentEmailLabel: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 4,
  },
  recentEmailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: colors.gray,
    fontSize: 16,
  },
  registerLink: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 10
  }
});
