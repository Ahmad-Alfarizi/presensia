// AdminFAQ.js
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Header from "../Components/Header";
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function AdminFAQ() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  const faqList = [
    {
      question: "How to manage user accounts?",
      answer:
        "To manage user accounts, go to the 'Users' section in the dashboard. Here you can add, edit, or remove student and lecturer profiles. Use search and filters to find users quickly.",
    },
    {
      question: "How to generate an attendance report?",
      answer:
        "You can generate attendance reports from the 'Reports' tab. Choose the date range, class, and format (PDF, CSV), then tap 'Generate Report' to download the file.",
    },
    {
      question: "What to do if a student's attendance is marked incorrectly?",
      answer:
        "Administrators can manually override attendance records. Open the class session, find the student, and tap the 'Edit' icon to change their status and add a note if needed.",
    },
    {
      question: "How to set up a new class or course?",
      answer:
        "From the 'Courses' menu, select 'Add New Course'. Fill in the details such as name, code, lecturer, and schedule. Then enroll students to the new class.",
    },
    {
      question: "Troubleshooting login issues for lecturers",
      answer:
        "If a lecturer can't log in, ask them to use 'Forgot Password'. If issues persist, reset their password manually from 'Users'. Ensure their account is marked as Active.",
    },
  ];

  const toggleAccordion = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFAQ = faqList.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
     <Header titleHeader="FAQ" />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={22} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a question..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* FAQ List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filteredFAQ.map((faq, index) => (
          <View key={index} style={styles.card}>
            <TouchableOpacity
              style={styles.cardHeader}
              onPress={() => toggleAccordion(index)}
              activeOpacity={0.8}
            >
              <Text style={styles.question}>{faq.question}</Text>
              <MaterialIcons
                name="expand-more"
                size={24}
                color="#136dec"
                style={{
                  transform: [{ rotate: openIndex === index ? "180deg" : "0deg" }],
                }}
              />
            </TouchableOpacity>
            {openIndex === index && (
              <View style={styles.answerContainer}>
                <Text style={styles.answer}>{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7f8",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: "#333",
    fontFamily: "Lexend",
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  question: {
    fontSize: 16,
    color: "#222",
    fontWeight: "600",
    flex: 1,
    fontFamily: "Lexend",
  },
  answerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  answer: {
    fontSize: 14,
    color: "#555",
    fontFamily: "Lexend",
    lineHeight: 20,
  },
});
