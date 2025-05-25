import React, { useState } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

function TextExpander({
  children,
  style,
  buttonTextStyle,
  maxWords = 40,
  defaultColor = "#1D4ED8",
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Truncate text if not expanded
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, maxWords).join(" ") + "...";

  // Merge default and custom styles
  const defaultStyles = StyleSheet.create({
    text: {
      ...style,
    },
    buttonText: {
      color: defaultColor,
      textDecorationLine: "underline",
    },
  });

  return (
    <Text style={defaultStyles.text}>
      {displayText}{" "}
      <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
        <Text style={[defaultStyles.buttonText, buttonTextStyle]}>
          {isExpanded ? "Show less" : "Show more"}
        </Text>
      </TouchableOpacity>
    </Text>
  );
}

export default TextExpander;
