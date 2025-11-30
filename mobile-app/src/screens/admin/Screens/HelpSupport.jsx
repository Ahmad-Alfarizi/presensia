import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  useColorScheme,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../Components/Header";

export default function HelpSupport() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const helpItems = [
    {
      id: "faq",
      title: "Frequently Asked Questions",
      description: "Find quick answers to common admin questions.",
      icon: "help-outline",
    },
    {
      id: "guide",
      title: "User Guide",
      description: "Step-by-step guides on using Presensia.",
      icon: "menu-book",
    },
    {
      id: "contact",
      title: "Contact Support",
      description: "Get in touch with our support team.",
      icon: "mail-outline",
    },
  ];

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDark ? "#101822" : "#f6f7f8" },
      ]}
    >
      {/* Header */}
      <Header titleHeader="Help & Support" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchBox,
            { backgroundColor: isDark ? "#1f2937" : "#fff" },
          ]}
        >
          <MaterialIcons
            name="search"
            size={22}
            color={isDark ? "#9ca3af" : "#6b7280"}
            style={{ marginLeft: 12 }}
          />
          <TextInput
            placeholder="Search for help..."
            placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
            style={[styles.searchInput, { color: isDark ? "#fff" : "#111827" }]}
          />
        </View>
      </View>

      {/* Help List */}
      <FlatList
        data={helpItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.card,
              { backgroundColor: isDark ? "#1f2937" : "#fff" },
            ]}
            onPress={() => {
              if (item.id === "faq") {
                navigation.navigate("AdminFAQ");
              } else if (item.id === "guide") {
                navigation.navigate("UserGuide");
              } else if (item.id === "contact") {
                navigation.navigate("ContactSupport");
              }
            }}
          >
            <View style={styles.cardLeft}>
              <View
                style={[styles.iconWrapper, { backgroundColor: "#3B82F633" }]}
              >
                <MaterialIcons name={item.icon} size={26} color={"#3B82F6"} />
              </View>
              <View>
                <Text
                  style={[
                    styles.cardTitle,
                    { color: isDark ? "#fff" : "#111827" },
                  ]}
                >
                  {item.title}
                </Text>
                <Text
                  style={[
                    styles.cardDesc,
                    { color: isDark ? "#9ca3af" : "#6b7280" },
                  ]}
                >
                  {item.description}
                </Text>
              </View>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={20}
              color={isDark ? "#9ca3af" : "#6b7280"}
            />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
  placeholderIcon: {
    width: 40,
    height: 40,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    height: 48,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 12,
    padding: 16,
    elevation: 1,
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardDesc: {
    fontSize: 10,
    marginTop: 2,
  },
});
