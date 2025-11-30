import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks';
import { logger } from '../utils';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { user, loading } = useAuth();

  useEffect(() => {
    checkInitialLaunch();
  }, [user, loading]);

  const checkInitialLaunch = async () => {
    try {
      // Wait for auth to be ready
      if (loading) {
        return;
      }

      // Wait for 2 seconds to show splash screen
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (user) {
        // User is logged in, navigate to appropriate dashboard
        logger.info('User logged in', { uid: user.uid, role: user.role });
        navigation.replace(user.role === 'admin' ? 'AdminDashboard' : 'MemberDashboard');
      } else {
        // User not logged in, show auth flow
        logger.info('User not logged in, showing auth');
        navigation.replace('SelectedRole');
      }
    } catch (error) {
      logger.error('Error checking initial launch', error);
      navigation.replace('SelectedRole');
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;