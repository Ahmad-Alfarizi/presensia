// Profile screen showing user details and logout
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput, ActivityIndicator } from 'react-native';
import GlobalStyles from '../../../styles/GlobalStyles';
import { useAuth } from '../../../hooks';
import PrimaryButton from '../../../components/PrimaryButton';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage } from "../../../context/LanguageContext";
import { SafeAreaView } from 'react-native-safe-area-context';
import { getErrorMessage } from '../../../utils/errors';
import { logger } from '../../../utils';

export default function Profile({ navigation }) {
  const { user, signOut } = useAuth();
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || user?.fullname || '');
  const [editedNim, setEditedNim] = useState(user?.nim || user?.id || '');
  const { translate: t } = useLanguage();
  const handleEditPress = () => {
    setEditedName(user?.name || user?.fullname || '');
    setEditedNim(user?.nim || user?.id || '');
    setEditModalVisible(true);
  };

  const handleSaveEdit = () => {
    if (!editedName.trim()) {
      Alert.alert('Error', 'Nama tidak boleh kosong');
      return;
    }
    setEditModalVisible(false);
    Alert.alert('Success', 'Profil berhasil diperbarui');
  };

  const handleAccountSettings = () => {
    navigation?.navigate('AccountSettings');
  };

  const handleNotifications = () => {
    navigation?.navigate('NotificationPreferencesScreen');
  };

  const handleAppSettings = () => {
    navigation?.navigate('AppSettingsScreen');
  };

  const handleLogout = () => {
      Alert.alert(
        t('logout'),
        t('logoutConfirmation'),
        [
          {
            text: t('cancel'),
            style: "cancel"
          },
          {
            text: t('logout'),
            style: "destructive",
            onPress: async () => {
              try {
                logger.info('User initiating logout');
                await signOut();
                logger.info('User logged out successfully');
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
              } catch (error) {
                logger.error('Logout error', error);
                const message = getErrorMessage(error);
                Alert.alert(t('error'), message);
              }
            }
          }
        ]
      );
    };
  

  const displayName = user?.name || user?.fullname || 'User';
  const displayNim = user?.nim || user?.id || user?.uid?.substring(0, 15) || 'N/A';
  const displayEmail = user?.email || 'No email';

  return (
    <View style={styles.container}>
      {/* Header */}
      <SafeAreaView style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </SafeAreaView>

      {/* Main Content */}
      <ScrollView 
        contentContainerStyle={styles.main}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileInfo}>
            <Image
              source={{
                uri:'https://lh3.googleusercontent.com/aida-public/AB6AXuDRWPNIpmoPAplFqMQWgJIqugphhKG9Nop7OAaM04CHfcD979fIP78Yrgw1UKwY14JU-iacSAnRwRag0rOFiSmYakQo3jg8Iu0TB890HSFpB5_v5XVm8ZjaKTW0Q5pcHgl2ZpYn74izFjytqBlMdV7V2cHk9C7nDlsjc_JrU5k_9ljj-pg8RwoQxQBuQtgATEgEhzJEODQJGdzOxzwT5RyfYJ868DNRp4x22V9IWXBsz296kZLbyE-oHZwFvXDTSDE0DO2q99xW43w',
              }}
              style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{displayName}</Text>
              <Text style={styles.nim}>{displayNim}</Text>
              <Text style={styles.email}>{displayEmail}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
            <MaterialIcons name="edit" size={18} color="#4A90E2" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Settings List */}
        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingItem} onPress={handleAccountSettings}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(74,144,226,0.1)' }]}>
                <MaterialIcons name="person" size={22} color="#4A90E2" />
              </View>
              <Text style={styles.settingText}>Account Settings</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleNotifications}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(74,144,226,0.1)' }]}>
                <MaterialIcons name="notifications" size={22} color="#4A90E2" />
              </View>
              <Text style={styles.settingText}>Notification Preferences</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={handleAppSettings}>
            <View style={styles.settingLeft}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(74,144,226,0.1)' }]}>
                <MaterialIcons name="settings" size={22} color="#4A90E2" />
              </View>
              <Text style={styles.settingText}>App Settings</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#E94560" />
          ) : (
            <>
              <MaterialIcons name="logout" size={22} color="#E94560" />
              <Text style={styles.logoutText}>Logout</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={editModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <MaterialIcons name="close" size={28} color="#333" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <View style={{ width: 28 }} />
            </View>

            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Nama Lengkap</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan nama lengkap"
                  value={editedName}
                  onChangeText={setEditedName}
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>NIM / ID</Text>
                <TextInput
                  style={[styles.input, { color: '#999' }]}
                  placeholder="NIM / ID"
                  value={editedNim}
                  editable={false}
                  placeholderTextColor="#999"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={[styles.input, { color: '#999' }]}
                  placeholder="Email"
                  value={displayEmail}
                  editable={false}
                  placeholderTextColor="#999"
                />
              </View>

              <TouchableOpacity 
                style={styles.saveButton}
                onPress={handleSaveEdit}
              >
                <Text style={styles.saveButtonText}>Simpan Perubahan</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Batal</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FA' 
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  main: { 
    paddingHorizontal: 16, 
    paddingVertical: 16,
    paddingBottom: 100 
  },

  profileCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  profileInfo: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 16 
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    marginRight: 16,
  },
  name: { 
    fontSize: 18, 
    fontWeight: '600', 
    color: '#333',
    marginBottom: 4,
  },
  nim: { 
    fontSize: 13, 
    color: '#6C757D',
    fontWeight: '500',
  },
  email: {
    fontSize: 12,
    color: '#999',
    fontWeight: '400',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(74,144,226,0.15)',
    borderRadius: 8,
    height: 44,
    gap: 8,
  },
  editButtonText: {
    color: '#4A90E2',
    fontWeight: '600',
    fontSize: 14,
  },

  settingsCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingItem_last: {
    borderBottomWidth: 0,
  },
  settingLeft: { 
    flexDirection: 'row', 
    alignItems: 'center',
    flex: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  settingText: { 
    fontSize: 14, 
    color: '#333', 
    fontWeight: '500' 
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(233,69,96,0.15)',
    borderRadius: 8,
    height: 48,
    gap: 8,
  },
  logoutText: { 
    color: '#E94560', 
    fontWeight: '600', 
    fontSize: 16 
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 0,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalBody: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },

  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    height: 64,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navItemActive: { alignItems: 'center', justifyContent: 'center' },
  navText: { fontSize: 12, color: '#888' },
  navTextActive: { fontSize: 12, color: '#4A90E2', fontWeight: 'bold' },
});