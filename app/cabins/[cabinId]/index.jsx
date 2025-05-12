import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Cabin from "@/components/Cabin";
import Reservation from "@/components/Reservation";
import CabinSpinner from "@/components/CabinSpinner";

export default function CabinDetailPage() {
  const { cabinData, cabinId } = useLocalSearchParams();

  if (!cabinData && !cabinId) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>No cabin data provided.</Text>
      </View>
    );
  }

  let cabin;
  try {
    if (cabinData) {
      cabin = JSON.parse(cabinData);
    } else if (cabinId) {
      // In a real app, you would fetch the cabin data here
      return <CabinSpinner />;
    }
  } catch (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Invalid cabin data: {error.message}
        </Text>
      </View>
    );
  }

  // Mock settings for UI demonstration
  const settings = {
    minBookingLength: 1,
    maxBookingLength: 30,
    maxNumberOfGuests: cabin.maxCapacity,
    breakfastPrice: 15,
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Render cabin details */}
      <Cabin cabin={cabin} />

      <Text style={styles.header}>
        Reserve {cabin?.name || "this cabin"} today. Pay on arrival.
      </Text>

      {/* Render reservation component with settings */}
      <Reservation cabin={cabin} settings={settings} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    padding: 16,
    paddingBottom: 100,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#d2af84",
    marginVertical: 16,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 16,
    textAlign: "center",
  },
});
