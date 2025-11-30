import React from "react";
import { View, StyleSheet } from "react-native";

export default function OnboardingIndicator({ activeIndex }) {
  return (
    <View style={styles.container}>
      {[0, 1, 2].map((i) => (
        <View
          key={i}
          style={[
            styles.dot,
            { backgroundColor: i === activeIndex ? "#136dec" : "#ccc" },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginVertical: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
