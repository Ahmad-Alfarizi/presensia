// Home dashboard screen showing greeting, today's classes and check-in CTA
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../../../hooks";
import GlobalStyles from "../../../styles/GlobalStyles";
import ScheduleCard from "../../../components/ScheduleCard";
import PrimaryButton from "../../../components/PrimaryButton";
import api from "../../../services/api";
import colors from "../../../constants/colors";
import TopBar from "../../../components/TopBar";
import StatCard from "../../../components/StatCard";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { logger } from "../../../utils";
export default function Home({ navigation }) {
  const { user } = useAuth();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadClasses() {
      try {
        setLoading(true);
        setError(null);
        const data = await api.fetchTodayClasses();
        logger.debug('Classes loaded', { count: data.length });
        setClasses(data);
      } catch (e) {
        logger.error('Failed to load classes', e);
        setError("Could not load today's classes");
      } finally {
        setLoading(false);
      }
    }
    loadClasses();
  }, []);

  return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
        >
          <TopBar />

          {/* Stats Cards */}
          <View style={styles.statsContainer}>
            <StatCard
              icon="check-circle"
              title="Present"
              value="12"
              color="green"
            />
            <StatCard icon="cancel" title="Absent" value="1" color="red" />
            <StatCard icon="schedule" title="Late" value="2" color="orange" />
          </View>

          {/* Check-in Button */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.checkInButton}>
              <Text style={styles.checkInButtonText}>Check-in Attendance</Text>
            </TouchableOpacity>
          </View>

          {/* Today's Schedule Section */}
          <View style={styles.sectionWrapper}>
            <Text style={styles.sectionTitle}>Today's Schedule</Text>

            <View style={styles.scheduleContainer}>
              <ScheduleCard
                icon="design_services"
                title="Interaction Design"
                lecturer="Dr. Alan Grant"
                room="Room 401"
                time="09:00 AM - 11:00 AM"
              />
              <ScheduleCard
                icon="psychology"
                title="Cognitive Psychology"
                lecturer="Dr. Ellie Sattler"
                room="Room 203"
                time="11:30 AM - 01:00 PM"
              />
              <ScheduleCard
                icon="calculate"
                title="Advanced Calculus"
                lecturer="Dr. Ian Malcolm"
                room="Auditorium B"
                time="02:00 PM - 04:00 PM"
              />
            </View>
          </View>
        </ScrollView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    marginVertical: 16,
    gap: 8,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  checkInButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  checkInButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  sectionWrapper: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textLight,
    marginBottom: 12,
  },
  scheduleContainer: {
    gap: 8,
  },
  loadingContainer: {
    padding: 24,
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#6B7280",
  },
  errorContainer: {
    padding: 24,
    alignItems: "center",
  },
  errorText: {
    color: "#DC2626",
    textAlign: "center",
  },
  emptyText: {
    padding: 24,
    textAlign: "center",
    color: "#6B7280",
  },
});
