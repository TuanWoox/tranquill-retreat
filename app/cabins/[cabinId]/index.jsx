import React, { Suspense } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import Reservation from "@/components/Reservation";
import { getCabin, getCabins } from "@/services/data-service";
import Cabin from "@/components/Cabin";

export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return {
    title: `Cabin ${name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  return (
    <View style={styles.container}>
      <Cabin cabin={cabin} />
      <View>
        <Text style={styles.header}>
          Reserve {cabin.name} today. Pay on arrival.
        </Text>
        <Suspense fallback={<ActivityIndicator size="large" color="#00ff00" />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4caf50",
    marginVertical: 16,
  },
});
