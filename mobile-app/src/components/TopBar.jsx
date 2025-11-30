import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../constants/colors";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TopBar() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.left}>
        <Image
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCit_Tl3CXQlvUyYIhfhc2ybPxD4jjIjXn5eslDDuE6RViW8RZTcQeOAlgwya9KQsNys4OLz96OSk9U1yANZKy0TzGKsZI_zaT7Q9dX2NvR2fwYd6kG42fA8vOqwtv7bZY-7LaAmC3lP7O2dU2wYIw_7N_TlSSIrwJ6BhH37QwuqlKBwat8t56B3tw1E5fLSuDhtFQCm2MLgmC2WmxRE-knwtR-NIJYhDcbO9_CGnRo93RKrC0BzkMclI_B-J9rhaIeG6-SFeLca1Q",
          }}
          style={styles.avatar}
        />
        <Text style={styles.greeting}>Hello, Jane!</Text>
      </View>
      <TouchableOpacity style={styles.notificationButton}>
        <MaterialIcons
          name="notifications"
          size={24}
          color={colors.textLight}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  greeting: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: colors.textLight,
  },
  notificationButton: {
    padding: 8,
  },
});
