import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SelectRoleScreen({ navigation }) {
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      id: 'anggota',
      title: 'Anggota',
      description: 'For students/empoyee to mark attendance and view schedules.',
      icon: 'person',
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'For lecturers or staff to manage classes and attendance.',
      icon: 'admin-panel-settings',
    },
  ];

  const handleContinue = () => {
    if (!selectedRole) return;
    navigation.navigate(selectedRole === 'anggota' ? 'LoginMember' : 'Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0QrhWO7AbWnNjC-3vtF1Hm78Thb1G7f1dCaanjYpuEqo3l_mgDthPw54vewmV7qC6_r8ePQEunCTWgFNjy2Q3D8B_6wPmK300Dxc150lf6NPvyO_1D7W3FxK2u6tWzl3-wOo1Q8FnDlmZCmcOnjnDVgPacoraJw1_hC2rsqu2NLT2VUE_pEuaEe_sQRkwqTG_4vSgkbUUXQgdRgq3a52iGJTBvG1UhbCNqwdtd85exG8nkLgcjYLoKfS6AEo-zUzvuFvkcPpidkQ',
            }}
            style={styles.logo}
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>Welcome to Presensia</Text>
        <Text style={styles.subtitle}>Please select your role to continue.</Text>

        {/* Role Cards */}
        <View style={styles.rolesContainer}>
          {roles.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={[
                styles.roleCard,
                selectedRole === role.id && styles.roleCardSelected,
              ]}
              activeOpacity={0.9}
              onPress={() => setSelectedRole(role.id)}
            >
              <View style={styles.roleLeft}>
                <View style={styles.iconWrapper}>
                  <MaterialIcons name={role.icon} size={26} color="#111418" />
                </View>
                <View>
                  <Text style={styles.roleTitle}>{role.title}</Text>
                  <Text style={styles.roleDesc}>{role.description}</Text>
                </View>
              </View>

              {/* Radio Button */}
              <View style={styles.radioOuter}>
                {selectedRole === role.id && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedRole && styles.continueButtonDisabled,
          ]}
          disabled={!selectedRole}
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f7f8' },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center',
  },
  logoContainer: { marginBottom: 24 },
  logo: { width: 80, height: 80, borderRadius: 16 },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111418',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#617289',
    textAlign: 'center',
    marginBottom: 28,
  },

  rolesContainer: { width: '100%', gap: 12 },
  roleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  roleCardSelected: {
    borderColor: '#136dec',
    backgroundColor: 'rgba(19,109,236,0.08)',
  },
  roleLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  iconWrapper: {
    backgroundColor: '#f0f2f4',
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111418',
  },
  roleDesc: {
    fontSize: 9,
    color: '#617289',
    marginTop: 2,
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#136dec',
  },

  footer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
  },
  continueButton: {
    backgroundColor: '#136dec',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#a0aec0',
  },
  continueText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
