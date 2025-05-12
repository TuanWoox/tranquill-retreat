import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import TextExpander from "@/components/TextExpander";

const { width } = Dimensions.get("window");

function Cabin({ cabin }) {
  const { name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  const discountedPrice = discount > 0 ? regularPrice - discount : null;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: image }} style={styles.image} blurRadius={1} />
        <View style={styles.overlay} />

        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.capacityBadge}>
              <FontAwesome5 name="users" size={16} color="#FBBF24" />
              <Text style={styles.capacityText}>{maxCapacity} Guests</Text>
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <TextExpander style={styles.descriptionText}>
              {description}
            </TextExpander>

            <View style={styles.priceContainer}>
              {discountedPrice ? (
                <View style={styles.pricingWrapper}>
                  <Text style={styles.discountedPrice}>${discountedPrice}</Text>
                  <Text style={styles.originalPrice}>${regularPrice}</Text>
                </View>
              ) : (
                <Text style={styles.price}>${regularPrice}</Text>
              )}
              <Text style={styles.perNight}>/ night</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginVertical: 16,
  },
  card: {
    width: width - 32,
    height: 380,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 15,
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#FBBF24",
    maxWidth: "70%",
  },
  capacityBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  capacityText: {
    color: "#FBBF24",
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  detailsContainer: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 16,
    padding: 16,
  },
  descriptionText: {
    color: "#CBD5E1", // Slightly brighter for better readability
    fontSize: 15,
    marginBottom: 16,
    lineHeight: 22,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline", // Changed to baseline for better alignment
    justifyContent: "flex-start", // Changed to start alignment
    alignItems: "center",
  },
  pricingWrapper: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    fontSize: 26,
    fontWeight: "800",
    color: "#10B981",
    marginRight: 8, // Added margin between price and per night
  },
  discountedPrice: {
    fontSize: 26,
    fontWeight: "800",
    color: "#10B981",
    marginRight: 8, // Consistent margin
  },
  originalPrice: {
    fontSize: 18,
    color: "#E5E7EB",
    textDecorationLine: "line-through",
    marginRight: 8, // Added margin
  },
  perNight: {
    color: "#F3F4F6",
    fontSize: 14, // Slightly smaller
    marginBottom: 2, // Adjusted to align better
  },
});

export default Cabin;
