import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateSelector from "./DateSelector";
import { useAuthContext } from "@/context/AuthContext";
import { differenceInDays } from "date-fns";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import { useCreateBooking } from "@/hooks/useCreateBooking";

export default function Reservation({ cabin, settings }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthContext();
  const { createBookingFn, isLoading: isSubmitting } = useCreateBooking();

  // Local state with proper date objects - matches DateSelector expectations
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [numGuests, setNumGuests] = useState(1);
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const [observations, setObservations] = useState("");

  // Handle date change from DateSelector
  const handleDateChange = (newRange) => {
    setDateRange(newRange);
  };

  // Reset the date range
  const handleResetDates = () => {
    setDateRange({ from: null, to: null });
  };

  // Create booking using the hook
  const handleCreateBooking = () => {
    if (!isAuthenticated) {
      Toast.show({
        type: "error",
        text1: "Please log in to book a cabin",
      });
      router.push("/auth/login");
      return;
    }

    if (!dateRange.from || !dateRange.to) {
      Toast.show({
        type: "error",
        text1: "Please select dates for your stay",
      });
      return;
    }

    // Calculate nights and pricing
    const numNights = differenceInDays(dateRange.to, dateRange.from);
    const cabinPrice = cabin?.discount
      ? cabin?.regularPrice - cabin?.discount
      : cabin?.regularPrice || 0;

    // Calculate extras price if breakfast is included
    const extrasPrice =
      hasBreakfast && settings?.breakfastPrice
        ? settings.breakfastPrice * numGuests * numNights
        : 0;

    // Calculate total price
    const totalPrice = cabinPrice * numNights + extrasPrice;

    // Create booking data object - use the correct ID property
    const bookingData = {
      startDate: dateRange.from,
      endDate: dateRange.to,
      numNights,
      numGuests,
      cabinPrice: cabinPrice * numNights,
      extrasPrice,
      totalPrice,
      hasBreakfast,
      observations,
      cabin: cabin._id || cabin.id, // Handle both possible ID formats
    };

    // Submit booking using the hook
    createBookingFn(bookingData);
  };

  if (!isAuthenticated) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.messageText}>
          Please{" "}
          <Text
            style={styles.linkText}
            onPress={() => router.push("/auth/login")}
          >
            login
          </Text>{" "}
          to reserve this cabin
        </Text>
      </View>
    );
  }

  const { from, to } = dateRange;
  const displayName = user?.fullName || "Visitor";

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.userHeader}>
        <View style={styles.userInfo}>
          <Text style={styles.loggedInText}>Logged in as</Text>
          <Text style={styles.username}>{displayName}</Text>
        </View>
        <View style={styles.userAvatar}>
          <Ionicons name="person" size={24} color="#FBBF24" />
        </View>
      </View>

      {/* Pass only the props DateSelector actually uses */}
      <DateSelector
        settings={
          settings || {
            minBookingLength: 1,
            maxBookingLength: 30,
            maxNumberOfGuests: cabin?.maxCapacity || 8,
          }
        }
        cabin={cabin} // DateSelector will use cabin._id internally
        dateRange={dateRange}
        onDateChange={handleDateChange}
        onReset={handleResetDates}
      />

      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>How many guests?</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={numGuests}
            style={styles.picker}
            dropdownIconColor="#E5E7EB"
            onValueChange={(value) => setNumGuests(value)}
          >
            {Array.from(
              {
                length: settings?.maxNumberOfGuests || cabin?.maxCapacity || 8,
              },
              (_, i) => i + 1
            ).map((num) => (
              <Picker.Item
                key={num}
                label={`${num} ${num === 1 ? "guest" : "guests"}`}
                value={num}
                color="#E5E7EB"
              />
            ))}
          </Picker>
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.formLabel}>Include breakfast?</Text>
          <Switch
            value={hasBreakfast}
            onValueChange={(value) => setHasBreakfast(value)}
            trackColor={{ false: "#3e3e3e", true: "#81b0ff" }}
            thumbColor={hasBreakfast ? "#FBBF24" : "#f4f3f4"}
          />
          {hasBreakfast && settings?.breakfastPrice && (
            <Text style={styles.breakfastNote}>
              (${settings.breakfastPrice} per person/night)
            </Text>
          )}
        </View>

        <Text style={styles.formLabel}>
          Anything we should know about your stay?
        </Text>
        <TextInput
          style={styles.textArea}
          placeholder="Any special requests, allergies, etc."
          placeholderTextColor="#6B7280"
          value={observations}
          onChangeText={setObservations}
          multiline={true}
          numberOfLines={4}
        />

        <View style={styles.priceContainer}>
          {cabin?.discount > 0 ? (
            <>
              <Text style={styles.currentPrice}>
                ${(cabin.regularPrice - cabin.discount).toFixed(2)}
              </Text>
              <Text style={styles.originalPrice}>
                ${cabin.regularPrice.toFixed(2)}
              </Text>
            </>
          ) : (
            <Text style={styles.currentPrice}>
              ${cabin?.regularPrice?.toFixed(2)}
            </Text>
          )}
          <Text style={styles.perNight}>/ night</Text>
        </View>

        {from && to ? (
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={handleCreateBooking}
            disabled={isSubmitting}
          >
            <Text style={styles.reserveButtonText}>
              {isSubmitting ? "Reserving..." : "Reserve Now"}
            </Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.startHint}>Start by selecting dates</Text>
        )}
      </View>
    </ScrollView>
  );
}

// Styles remain unchanged

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E293B",
  },
  userHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  userInfo: {
    flexDirection: "column",
  },
  loggedInText: {
    color: "#E5E7EB",
    fontSize: 14,
    marginBottom: 4,
  },
  username: {
    color: "#FBBF24",
    fontSize: 18,
    fontWeight: "600",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(251,191,36,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    padding: 16,
  },
  formLabel: {
    color: "#E5E7EB",
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
  },
  pickerContainer: {
    backgroundColor: "#334155",
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    color: "#E5E7EB",
    backgroundColor: "transparent",
  },
  textArea: {
    backgroundColor: "#334155",
    borderRadius: 8,
    padding: 12,
    color: "#E5E7EB",
    fontSize: 16,
    height: 120,
    textAlignVertical: "top",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
  },
  breakfastNote: {
    color: "#A7F3D0",
    fontSize: 14,
    marginLeft: 12,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  currentPrice: {
    color: "#10B981",
    fontSize: 24,
    fontWeight: "700",
    marginRight: 8,
  },
  originalPrice: {
    color: "#E5E7EB",
    fontSize: 16,
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  perNight: {
    color: "#E5E7EB",
    fontSize: 14,
  },
  reserveButton: {
    backgroundColor: "#FBBF24",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  reserveButtonText: {
    color: "#1E293B",
    fontSize: 16,
    fontWeight: "600",
  },
  startHint: {
    color: "#FBBF24",
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  messageText: {
    color: "#E5E7EB",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 24,
  },
  linkText: {
    color: "#FBBF24",
    textDecorationLine: "underline",
  },
});
