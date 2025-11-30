import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLanguage } from "../../../context/LanguageContext";

export default function TopBar() {
  const { translate: t } = useLanguage();
  
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>{t('appName')}</Text>
        <Image
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuBkMjpCSoiGSiDutk1WGvFYFnZ5suEfZ1oklVvjiWdvRJEy3coPzrSIX2IXdo2DVCmT8xxZZ1KfwqS48XZc5g5yIzcoOS-STBBp-XUKkrDDo8og05SaIAa_ewTN5IY0Ovbe08xNp5XGluliCZSqCquLeGWSniZ4jhiE_4kR6tp52O89ENur3RB_6tJ5zYKJhSCUTMinBcAyeWc0vbRiwsARn4RyLSiSQWxdE6dkjOFC6YIo28PwftonWxT1irTHkneBZhOS0GBgHMw",
          }}
          style={styles.avatar}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111418",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
