import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { UsersIcon } from "react-native-heroicons/solid";
import { Link } from "expo-router";

function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;

  return (
    <View style={styles.container}>
      {/* Image section */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      {/* Content section */}
      <View style={styles.contentContainer}>
        {/* Header section */}
        <View style={styles.header}>
          <Text style={styles.cabinName}>Cabin {name}</Text>

          <View style={styles.capacityContainer}>
            <UsersIcon size={20} color="#90A4AE" />
            <Text style={styles.capacityText}>
              For up to <Text style={styles.bold}>{maxCapacity}</Text> guests
            </Text>
          </View>

          <View style={styles.priceContainer}>
            {discount > 0 ? (
              <>
                <Text style={styles.discountedPrice}>
                  ${regularPrice - discount}
                </Text>
                <Text style={styles.originalPrice}>${regularPrice}</Text>
              </>
            ) : (
              <Text style={styles.price}>${regularPrice}</Text>
            )}
            <Text style={styles.perNight}>/ night</Text>
          </View>
        </View>

        {/* Footer section */}
        <View style={styles.footer}>
          <Link href={`/cabins/${id}`} asChild>
            <TouchableOpacity style={styles.detailsButton}>
              <Text style={styles.detailsButtonText}>
                Details & reservation →
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#263238",
  },
  imageContainer: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#263238",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: "#0D1B2A",
  },
  cabinName: {
    color: "#F9A826",
    fontWeight: "600",
    fontSize: 22,
    marginBottom: 12,
  },
  capacityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 12,
  },
  capacityText: {
    fontSize: 16,
    color: "#B0BEC5",
  },
  bold: {
    fontWeight: "bold",
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "baseline",
    gap: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: "300",
  },
  discountedPrice: {
    fontSize: 24,
    fontWeight: "300",
  },
  originalPrice: {
    textDecorationLine: "line-through",
    fontWeight: "600",
    color: "#90A4AE",
  },
  perNight: {
    color: "#B0BEC5",
  },
  footer: {
    backgroundColor: "#0D1B2A",
    borderTopWidth: 1,
    borderTopColor: "#263238",
    alignItems: "flex-end",
  },
  detailsButton: {
    borderLeftWidth: 1,
    borderLeftColor: "#263238",
    padding: 16,
  },
  detailsButtonText: {
    color: "white",
  },
});

export default CabinCard;
