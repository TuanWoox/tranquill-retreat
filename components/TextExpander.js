import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 40).join(" ") + "...";

  return (
    <Text>
      {displayText}{" "}
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={styles.buttonText}>
          {isExpanded ? "Show less" : "Show more"}
        </Text>
      </TouchableOpacity>
    </Text>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: "#1D4ED8", // Primary color
    textDecorationLine: "underline",
  },
});

export default TextExpander;
