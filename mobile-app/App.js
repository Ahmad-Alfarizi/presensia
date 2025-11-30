// Root App entry for the Presensia mobile app (Expo)
// Sets up Navigation and AuthContext provider
import React from 'react';
import { StatusBar, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigation from './src/navigation';
import { AuthProvider } from './src/context/AuthContext';
import { LanguageProvider } from './src/context/LanguageContext';
import { CourseProvider } from './src/context/CourseContext';
import { UserProvider } from './src/context/UserContext';
// Font loading from Expo Google Fonts
import { useFonts as usePoppins, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useFonts as useInter, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';

export default function App() {
  // Load fonts (Poppins + Inter)
  const [pLoaded] = usePoppins({ Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold });
  const [iLoaded] = useInter({ Inter_400Regular, Inter_600SemiBold });

  if (!pLoaded || !iLoaded) {
    // Simple fallback while fonts load
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4F6FA' }}>
        <Text>Loading Presensia…</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <LanguageProvider>
          <CourseProvider>
            <UserProvider>
              <NavigationContainer>
                <StatusBar barStyle="dark-content" />
                <AppNavigation />
              </NavigationContainer>
            </UserProvider>
          </CourseProvider>
        </LanguageProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
