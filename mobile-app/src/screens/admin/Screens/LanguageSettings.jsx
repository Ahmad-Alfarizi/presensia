import React, { useState, useEffect, useContext } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../Components/Header";
import { useLanguage } from "../../../context/LanguageContext";
import { AuthContext } from "../../../context/AuthContext";
export default function LanguageSettings() {
  const navigation = useNavigation();
  const { language, setLanguage } = useLanguage();
  const { user, loading: authLoading } = useContext(AuthContext);
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [saving, setSaving] = useState(false);

  const languages = [
    { id: "english", label: "English", description: "Use English language" },
    { id: "indonesian", label: "Bahasa Indonesia", description: "Pake bahasa Indonesia yang santai" },
  ];

  useEffect(() => {
    setSelectedLanguage(language);
  }, [language]);

  const handleSelect = (id) => setSelectedLanguage(id);

  const handleSave = async () => {
    if (selectedLanguage === language) {
      navigation.goBack();
      return;
    }

    if (authLoading || !user) {
      Alert.alert(
        selectedLanguage === 'indonesian' ? 'Tunggu Sebentar' : 'Please Wait',
        selectedLanguage === 'indonesian' 
          ? 'Lagi memuat data user...' 
          : 'Loading user data...'
      );
      return;
    }

    setSaving(true);
    try {
      console.log('Saving language:', selectedLanguage, 'for user:', user.uid);
      const success = await setLanguage(selectedLanguage);
      console.log('Save result:', success);
      if (success) {
        Alert.alert(
          selectedLanguage === 'indonesian' ? 'Sukses!' : 'Success!',
          selectedLanguage === 'indonesian' 
            ? 'Bahasa udah diganti nih.' 
            : 'Language has been changed.',
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack()
            }
          ]
        );
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      Alert.alert(
        selectedLanguage === 'indonesian' ? 'Ups, Error!' : 'Error',
        selectedLanguage === 'indonesian' 
          ? 'Gagal ganti bahasa nih, coba lagi ya.' 
          : 'Failed to change language. Please try again.'
      );
    } finally {
      setSaving(false);
    }

  };

  return (
    <SafeAreaView style={styles.container}>
      <Header titleHeader={selectedLanguage === 'indonesian' ? 'Pengaturan Bahasa' : 'Language Settings'} />

      <FlatList
        data={languages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.languageItem,
              selectedLanguage === item.id && styles.languageItemSelected,
            ]}
            onPress={() => handleSelect(item.id)}
            activeOpacity={0.7}
          >
            <View style={styles.languageContent}>
              <Text style={styles.languageLabel}>{item.label}</Text>
              <Text style={styles.languageDescription}>{item.description}</Text>
            </View>
            <View
              style={[
                styles.radioOuter,
                selectedLanguage === item.id && styles.radioOuterSelected,
              ]}
            >
              {selectedLanguage === item.id && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      />

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.saveButton,
            saving && styles.saveButtonDisabled
          ]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.saveButtonText}>
              {selectedLanguage === 'indonesian' ? 'Simpan' : 'Save Changes'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    minHeight: 64,
    elevation: 1,
  },
  languageItemSelected: {
    borderWidth: 2,
    borderColor: "#136dec",
  },
  languageContent: {
    flex: 1,
    marginRight: 16,
  },
  languageLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1D2129",
    marginBottom: 4,
  },
  languageDescription: {
    fontSize: 14,
    color: "#666",
  },
  radioOuter: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#6c757d",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: "#136dec",
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#136dec",
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  saveButton: {
    backgroundColor: "#136dec",
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonDisabled: {
    backgroundColor: "#93c5fd",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
