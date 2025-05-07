import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Page() {
  const navigation = useNavigation();

  return (
    <View
      style={{ alignItems: "center", marginTop: 16, paddingHorizontal: 16 }}
    >
      <Text style={{ fontSize: 24, fontWeight: "600", textAlign: "center" }}>
        Thank you for your reservation!
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Reservations")}
        style={{ marginTop: 16 }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "#1E90FF",
            textDecorationLine: "underline",
          }}
        >
          Manage your reservations →
        </Text>
      </TouchableOpacity>
    </View>
  );
}
