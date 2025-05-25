import React from "react";
import { Slot, useLocalSearchParams, useNavigation } from "expo-router";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BackgroundLayout from "../../../components/BackgroundLayout";

const { width, height } = Dimensions.get("window");

export default function CabinRouteLayout() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const hasCabinInfo = params?.cabinId || params?.cabinData;
  const handleBack = () => navigation.goBack();

  if (!hasCabinInfo) {
    return (
      <BackgroundLayout>
        <BlurView
          intensity={40}
          tint="dark"
          style={[styles.header, { paddingTop: insets.top }]}
        >
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="#FBBF24" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Details</Text>
        </BlurView>
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={80}
            color="#FF6B6B"
            style={styles.errorIcon}
          />
          <Text style={styles.errorTitle}>Oops!</Text>
          <Text style={styles.errorMessage}>
            Unable to load cabin information
          </Text>
          <TouchableOpacity
            style={styles.returnButton}
            onPress={() => navigation.replace("cabins")}
          >
            <Text style={styles.returnButtonText}>Back to Cabins</Text>
            <Ionicons
              name="arrow-forward"
              size={18}
              color="#FBBF24"
              style={styles.returnButtonIcon}
            />
          </TouchableOpacity>
        </View>
      </BackgroundLayout>
    );
  }

  return (
    <BackgroundLayout>
      <BlurView
        intensity={40}
        tint="dark"
        style={[styles.header, { paddingTop: insets.top }]}
      >
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#FBBF24" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Details</Text>
      </BlurView>
      <View style={styles.content}>
        <Slot />
      </View>
    </BackgroundLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(251,191,36,0.2)", // Amber accent
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(251,191,36,0.2)", // Soft amber background
  },
  headerTitle: {
    color: "#FBBF24", // Amber color
    fontSize: 24,
    fontWeight: "700",
    marginLeft: 16,
    letterSpacing: 0.5,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  errorIcon: {
    marginBottom: 24,
    opacity: 0.8,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  errorTitle: {
    color: "#FF6B6B",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 12,
    letterSpacing: 1,
  },
  errorMessage: {
    color: "#E5E7EB",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 24,
    opacity: 0.8,
  },
  returnButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(251,191,36,0.3)", // Amber border
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  returnButtonText: {
    color: "#FBBF24",
    fontWeight: "700",
    fontSize: 16,
    marginRight: 8,
  },
  returnButtonIcon: {
    marginLeft: 4,
  },
});
