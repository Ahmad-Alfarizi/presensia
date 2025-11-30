import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../Components/Header";
import { useAuth } from "../../../hooks";

export default function ManageSubs() {
  const { user, updateProfile } = useAuth();
  const [currentPlan, setCurrentPlan] = useState(user?.plan || "premium");
  
  const handlePlanChange = (plan) => {
    Alert.alert(
      "Change Plan",
      `Are you sure you want to change to ${plan} plan?`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Confirm",
          onPress: async () => {
            try {
              // Update plan in Firestore via auth API (updateProfile)
              await updateProfile({ plan });
              setCurrentPlan(plan);
              Alert.alert("Success", "Your subscription has been updated successfully!");
            } catch (error) {
              Alert.alert("Error", "Failed to update subscription. Please try again.");
            }
          }
        }
      ]
    );
  };

  const handleCancelSubscription = () => {
    Alert.alert(
      "Cancel Subscription",
      "Are you sure you want to cancel your subscription? This will downgrade your account to the free plan at the end of your billing period.",
      [
        {
          text: "No, Keep It",
          style: "cancel"
        },
        {
          text: "Yes, Cancel",
          style: "destructive",
          onPress: async () => {
            try {
              // TODO: Implement subscription cancellation in backend
              Alert.alert(
                "Subscription Cancelled",
                "Your subscription will remain active until the end of the current billing period."
              );
            } catch (error) {
              Alert.alert("Error", "Failed to cancel subscription. Please try again.");
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header titleHeader="Manage Subscription" /> 

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.sectionTitle}>Your Current Plan</Text>

        {/* Current Plan */}
        <View style={styles.currentCard}>
          <View style={styles.currentHeader}>
            <Text style={styles.currentPlan}>Premium Plan</Text>
            <View style={styles.currentBadge}>
              <Text style={styles.badgeText}>Current Plan</Text>
            </View>
          </View>
          <Text style={styles.priceText}>
            <Text style={{ fontWeight: "bold" }}>$99.99</Text> / month
          </Text>
          <Text style={styles.renewText}>Renews on December 31, 2024</Text>
        </View>

        <Text style={styles.sectionTitle}>Available Plans</Text>

        {/* Basic Plan */}
        <View style={styles.planCard}>
          <Text style={styles.planName}>Basic Plan</Text>
          <Text style={styles.planPrice}>$29.99 / month</Text>
          <TouchableOpacity style={styles.downgradeBtn}>
            <Text style={styles.downgradeText}>Downgrade</Text>
          </TouchableOpacity>
          {["Up to 50 users", "Basic reporting", "Email support"].map((item, i) => (
            <View key={i} style={styles.featureRow}>
              <MaterialIcons name="check-circle" size={18} color="green" />
              <Text style={styles.featureText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Standard Plan */}
        <View style={styles.planCard}>
          <Text style={styles.planName}>Standard Plan</Text>
          <Text style={styles.planPrice}>$59.99 / month</Text>
          <TouchableOpacity style={styles.downgradeBtn}>
            <Text style={styles.downgradeText}>Downgrade</Text>
          </TouchableOpacity>
          {["Up to 200 users", "Advanced reporting", "Priority support"].map((item, i) => (
            <View key={i} style={styles.featureRow}>
              <MaterialIcons name="check-circle" size={18} color="green" />
              <Text style={styles.featureText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Premium Plan */}
        <View style={[styles.planCard, styles.activePlan]}>
          <View style={styles.currentHeader}>
            <Text style={styles.planName}>Premium Plan</Text>
            <View style={styles.currentBadge}>
              <Text style={styles.badgeText}>Current</Text>
            </View>
          </View>
          <Text style={styles.planPrice}>$99.99 / month</Text>
          <TouchableOpacity disabled style={styles.disabledBtn}>
            <Text style={styles.disabledText}>Current Plan</Text>
          </TouchableOpacity>
          {["Unlimited users", "Full reporting suite", "Dedicated 24/7 support"].map((item, i) => (
            <View key={i} style={styles.featureRow}>
              <MaterialIcons name="check-circle" size={18} color="green" />
              <Text style={styles.featureText}>{item}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.cancelBtn}
          onPress={handleCancelSubscription}
        >
          <Text style={styles.cancelText}>Cancel Subscription</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f7f8" },
  header: {
    height: 60,
    backgroundColor: "#136dec",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  scroll: { padding: 16, paddingBottom: 100 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#111", marginTop: 12, marginBottom: 8 },
  currentCard: {
    backgroundColor: "rgba(19, 109, 236, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  currentHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  currentPlan: { fontSize: 16, fontWeight: "bold", color: "#136dec" },
  currentBadge: {
    backgroundColor: "rgba(19, 109, 236, 0.2)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: { fontSize: 12, fontWeight: "600", color: "#136dec" },
  priceText: { fontSize: 16, marginTop: 8 },
  renewText: { fontSize: 13, color: "#555" },
  planCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  activePlan: {
    borderWidth: 2,
    borderColor: "#136dec",
    backgroundColor: "rgba(19, 109, 236, 0.05)",
  },
  planName: { fontSize: 16, fontWeight: "bold", color: "#111" },
  planPrice: { fontSize: 20, fontWeight: "800", marginVertical: 8 },
  downgradeBtn: {
    backgroundColor: "#f0f2f4",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 6,
  },
  downgradeText: { color: "#111", fontWeight: "bold" },
  disabledBtn: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 6,
  },
  disabledText: { color: "#666", fontWeight: "bold" },
  featureRow: { flexDirection: "row", alignItems: "center", gap: 8, marginVertical: 2 },
  featureText: { fontSize: 13, color: "#111" },
  cancelBtn: { alignItems: "center", marginTop: 20 },
  cancelText: { color: "#e11d48", fontWeight: "bold" },
});
