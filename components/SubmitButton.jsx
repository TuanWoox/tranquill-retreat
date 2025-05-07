import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

function SubmitButton({ children, pendingLabel = "is updating...", pending }) {
  return (
    <TouchableOpacity
      style={[styles.button, pending && styles.disabledButton]}
      disabled={pending}
    >
      <Text style={[styles.text, pending && styles.disabledText]}>
        {pending ? pendingLabel : children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4caf50", // Replace with your accent color
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#9e9e9e", // Disabled background color
  },
  text: {
    color: "#ffffff", // Replace with your primary text color
    fontWeight: "bold",
  },
  disabledText: {
    color: "#bdbdbd", // Disabled text color
  },
});

export default SubmitButton;
