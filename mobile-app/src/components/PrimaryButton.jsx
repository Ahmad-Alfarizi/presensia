// PrimaryButton: gradient, rounded primary action button
import React, { useRef } from "react";
import {
  Animated,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from "../constants/colors";

// PrimaryButton: small press animation using Animated API
export default function PrimaryButton({ title, onPress, style, disabled }) {
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.white,
    fontWeight: "600",
  },
  
});
