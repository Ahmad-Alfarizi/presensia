import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Header({titleHeader = ""}) {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{titleHeader}</Text>
        <View style={{ width: 24 }} />
      </View>
    </SafeAreaView>
  );
}

export default Header;

const styles = StyleSheet.create({
  //   container: { flex: 1, backgroundColor: "#f6f7f8" },
  header: {
    height: 60,
    backgroundColor: "#136dec",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});
