import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons"; // For icons
import TextExpander from "@/components/TextExpander"; // Assuming this is compatible with React Native

function Cabin({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>

      <View style={styles.details}>
        <Text style={styles.title}>Cabin {name}</Text>

        <Text style={styles.description}>
          <TextExpander>{description}</TextExpander>
        </Text>

        <View style={styles.infoList}>
          <View style={styles.infoItem}>
            <FontAwesome name="users" size={20} color="#6B7280" />
            <Text style={styles.infoText}>
              For up to <Text style={styles.bold}>{maxCapacity}</Text> guests
            </Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome name="map-marker" size={20} color="#6B7280" />
            <Text style={styles.infoText}>
              Located in the heart of the{" "}
              <Text style={styles.bold}>Dolomites</Text> (Italy)
            </Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesome name="eye-slash" size={20} color="#6B7280" />
            <Text style={styles.infoText}>
              Privacy <Text style={styles.bold}>100%</Text> guaranteed
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#374151",
    padding: 16,
    marginBottom: 24,
  },
  imageContainer: {
    flex: 3,
    marginRight: 16,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  details: {
    flex: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FBBF24",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#9CA3AF",
    marginBottom: 16,
  },
  infoList: {
    marginTop: 8,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 16,
    color: "#9CA3AF",
    marginLeft: 8,
  },
  bold: {
    fontWeight: "bold",
  },
});

export default Cabin;
