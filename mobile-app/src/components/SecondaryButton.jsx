// PrimaryButton: gradient, rounded primary action button
import React, { useRef } from "react";
import { Animated, TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
// PrimaryButton: small press animation using Animated API
export default function SecondaryButton({ title, onPress, style, disabled }) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.wrapper}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <LinearGradient
        colors={["#4A90E2", "#50E3C2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}
      >
        <Animated.View
          style={[
            styles.button,
            { transform: [{ scale }] },
            disabled && styles.disabled,
            style,
          ]}
        >
          <Text style={styles.text}>{title}</Text>
        </Animated.View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  wrapper: {
    width: "100%",
    maxWidth: 350,
  },
  button: {
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    height: 56,
    borderRadius: 30,
    justifyContent: "center",
    shadowColor: "#000",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
