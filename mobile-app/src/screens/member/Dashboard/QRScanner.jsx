// QRScanner: mock QR scanner UI for prototyping
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions, ScrollView} from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withRepeat, 
  withSequence, 
  withTiming,
  useSharedValue,
  withSpring
} from 'react-native-reanimated';
import colors from '../../../constants/colors';

const { width } = Dimensions.get('window');

export default function QRScanner({ navigation }) {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState(null);
  
  // Animations
  const scanLinePosition = useSharedValue(0);
  const errorShake = useSharedValue(0);
  const scanBoxScale = useSharedValue(1);

  // Animated styles - defined unconditionally to avoid hooks order violation
  const scanBoxAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scanBoxScale.value }]
  }));

  const scanLineAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanLinePosition.value }]
  }));

  const errorTextAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: errorShake.value }]
  }));

  // Start scan line animation
  React.useEffect(() => {
    if (scanning) {
      scanLinePosition.value = withRepeat(
        withSequence(
          withTiming(240, { duration: 1500 }), // move down
          withTiming(0, { duration: 1500 }) // move up
        ),
        -1 // infinite
      );
      // Pulse scan box
      scanBoxScale.value = withRepeat(
        withSequence(
          withTiming(1.02, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1
      );
    } else {
      scanLinePosition.value = withTiming(0);
      scanBoxScale.value = withTiming(1);
    }
  }, [scanning]);

  const handleSimulateScan = async () => {
    setScanning(true);
    setError(null);
    
    try {
      // Simulate scan delay and potential errors
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 20% chance of error for testing
      if (Math.random() < 0.2) {
        throw new Error('Failed to read QR code. Please try again.');
      }
      
      // Success: navigate back with scan result
      navigation.navigate('Home', {
        screen: 'Attendance',
        params: {
          scanResult: {
            code: 'QR-CLASS-123',
            type: 'attendance',
            timestamp: new Date().toISOString()
          }
        }
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setScanning(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>QR Scanner</Text>
          <Text style={styles.subtitle}>Scan attendance QR code to check in</Text>
        </View>

        <View style={styles.scannerArea}>
          <Animated.View style={[
            styles.scanBox,
            scanBoxAnimatedStyle
          ]}>
            {scanning && (
              <>
                <Animated.View style={[
                  styles.scanLine,
                  scanLineAnimatedStyle
                ]} />
                <View style={styles.loadingOverlay}>
                  <ActivityIndicator size="large" color={colors.primary} />
                  <Text style={styles.loadingText}>Scanning...</Text>
                </View>
              </>
            )}
          </Animated.View>
          <Text style={styles.scanHint}>Align the QR code inside the box</Text>
          {error && (
            <Animated.Text
              style={[
                styles.errorText,
                errorTextAnimatedStyle
              ]}
            >
              {error}
            </Animated.Text>
          )}
        </View>

        <TouchableOpacity 
          style={[styles.button, scanning && styles.buttonDisabled]} 
          onPress={handleSimulateScan} 
          activeOpacity={0.85}
          disabled={scanning}
        >
          <Text style={styles.btnText}>
            {scanning ? 'Scanning...' : 'Simulate QR Scan'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.lightGray,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 32,
  },
  header: { 
    alignItems: 'center', 
    marginBottom: 32,
  },
  title: { 
    fontSize: 24, 
    fontWeight: '700',
    color: '#111418',
  },
  subtitle: { 
    color: '#6B7280', 
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
  scannerArea: { 
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    minHeight: 350,
  },
  scanBox: { 
    width: '80%',
    maxWidth: 280,
    aspectRatio: 1,
    borderRadius: 16, 
    borderWidth: 3, 
    borderColor: colors.primary, 
    backgroundColor: '#00000008',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: 20,
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.primary,
    opacity: 0.6
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13
  },
  loadingText: {
    color: colors.primary,
    marginTop: 12,
    fontWeight: '600',
    fontSize: 14,
  },
  scanHint: { 
    marginBottom: 12, 
    color: '#6B7280',
    fontSize: 13,
    textAlign: 'center',
  },
  errorText: {
    color: '#DC2626',
    marginTop: 12,
    textAlign: 'center',
    backgroundColor: '#FEE2E2',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    overflow: 'hidden',
    fontSize: 13,
    fontWeight: '500',
  },
  button: { 
    backgroundColor: colors.primary, 
    paddingVertical: 14, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginTop: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonDisabled: {
    opacity: 0.6
  },
  btnText: { 
    color: '#fff', 
    fontWeight: '700',
    fontSize: 16,
  }
});
