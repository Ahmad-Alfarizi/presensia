import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  ScrollView
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRoute, useNavigation } from "@react-navigation/native";
import { logger } from "../../../utils";

const Attendance = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Add export statement at the end of the file


  const [gpsEnabled, setGpsEnabled] = useState(false);
  const [checkedIn, setCheckedIn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [lastScan, setLastScan] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const handleCheckIn = () => {
    logger.info('Check-in initiated');
    setCheckedIn(true);
    setModalVisible(true);
    setTimeout(() => setModalVisible(false), 1500);
  };

  useEffect(() => {
    if (route.params?.scanResult) {
      setLastScan(route.params.scanResult);
      handleCheckIn();
    }
  }, [route.params]);

  const toggleLocation = async () => {
    setLocationLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        throw new Error("Location permission not granted");
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      logger.debug('Location retrieved', { lat: loc.coords.latitude, lng: loc.coords.longitude });
      setLocation(loc);
      setGpsEnabled(true);
    } catch (e) {
      logger.error('Location error', e);
      setLocationError(e.message);
      setGpsEnabled(false);
      Alert.alert("Location Error", e.message);
    } finally {
      setLocationLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <ImageBackground
            source={{
              uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuADVaenBvqx9CKCHk6fccqB4GW3lj75NdFt84my0gS89kZOi1V8-Cyl0MPDvSt-0Yapbb723-toOUMAUdR8p0I1yGn7k7A8uuqUt3Du-u--ThXOn7CWZCrrVEnQkxhbLsNC3H-lnvxU4kw852j84bLyP7hi2BEEW3O4KfQ1Y81p2NMFv0CTxsQ8IIGTDajddx8jq3RZ0RLbKy25C51BEaC0f5bMOB-aTnu8Ap-O5MLDzoOERF9GpD-2uWAFNHYl_ZRJOyqdGGyyLb0",
            }}
            style={styles.profileImage}
            imageStyle={{ borderRadius: 9999 }}
          />
          <Text style={styles.headerTitle}>
            Good Morning, Budi
          </Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView 
        style={styles.mainContent}
        contentContainerStyle={styles.mainContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Location Status */}
        <View style={styles.locationCard}>
          <View style={styles.locationIcon}>
            <MaterialIcons name="location-on" size={28} color="#50E3C2" />
          </View>
          <View style={styles.locationTextContainer}>
            <Text style={styles.locationLabel}>
              Location Status
            </Text>
            <Text style={styles.locationValue}>
              In Range: Main University Campus
            </Text>
          </View>
        </View>

        {/* Check-in Actions */}
        <View style={styles.checkInContainer}>
          <TouchableOpacity
            onPress={handleCheckIn}
            style={styles.checkInButton}
          >
            <MaterialIcons name="fingerprint" size={70} color="white" />
            <Text style={styles.checkInText}>
              Check-in
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("QRScanner")}
            style={styles.qrButton}
          >
            <MaterialIcons
              name="qr-code-scanner"
              size={22}
              color="#111418"
            />
            <Text style={styles.qrText}>
              Scan QR Code
            </Text>
          </TouchableOpacity>
        </View>

        {/* Schedule Info */}
        <View style={styles.scheduleCard}>
          <Text style={styles.scheduleLabel}>
            Next Class
          </Text>
          <View style={styles.scheduleInfo}>
            <Text style={styles.className}>
              Calculus II
            </Text>
            <Text style={styles.classTime}>
              10:00 AM
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Success Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <MaterialIcons name="check-circle" size={48} color="#50E3C2" />
            <Text style={styles.modalText}>
              Check-in Successful!
            </Text>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f6f7f8',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111418',
    flex: 1,
  },
  profileImage: {
    height: 44,
    width: 44,
    borderRadius: 22,
  },
  mainContent: {
    flex: 1,
  },
  mainContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 100,
    gap: 20,
  },
  locationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  locationTextContainer: {
    flex: 1,
  },
  locationIcon: {
    backgroundColor: 'rgba(80, 227, 194, 0.15)',
    borderRadius: 24,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  locationLabel: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  locationValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111418',
  },
  checkInContainer: {
    alignItems: 'center',
    gap: 16,
  },
  checkInButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 96,
    height: 160,
    width: 160,
    backgroundColor: '#136dec',
    shadowColor: 'rgba(19, 109, 236, 0.3)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  checkInText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  qrButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    gap: 8,
  },
  qrText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111418',
  },
  scheduleCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  scheduleLabel: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
  },
  scheduleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  className: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111418',
  },
  classTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#136dec',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    minWidth: 280,
  },
  modalText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    color: '#111418',
    textAlign: 'center',
  },
});
export default Attendance;