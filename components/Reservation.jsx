import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import DateSelector from "./DateSelector";
import { useAuthContext } from "@/context/AuthContext";
import { differenceInDays } from "date-fns";
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import { useCreateBooking } from "@/hooks/useCreateBooking";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

export default function Reservation({ cabin, settings }) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthContext();
  const { createBookingFn, isLoading: isSubmitting } = useCreateBooking();

  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [numGuests, setNumGuests] = useState(1);
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const [observations, setObservations] = useState("");

  const handleDateChange = (newRange) => {
    setDateRange(newRange);
  };

  const handleResetDates = () => {
    setDateRange({ from: null, to: null });
  };

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

    const numNights = differenceInDays(dateRange.to, dateRange.from);
    const cabinPrice = cabin?.discount
      ? cabin?.regularPrice - cabin?.discount
      : cabin?.regularPrice || 0;

    const extrasPrice =
      hasBreakfast && settings?.breakfastPrice
        ? settings.breakfastPrice * numGuests * numNights
        : 0;

    const totalPrice = cabinPrice * numNights + extrasPrice;

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
      cabin: cabin._id || cabin.id,
    };

    createBookingFn(bookingData);
  };

  if (!isAuthenticated) {
    return (
      <LinearGradient
        colors={["#1E293B", "#0F172A"]}
        style={styles.gradientContainer}
      >
        <StatusBar barStyle="light-content" />
        <View style={styles.centeredContainer}>
          <Ionicons name="log-in-outline" size={60} color="#FBBF24" />
          <Text style={styles.authTitle}>Authentication Required</Text>
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
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/auth/login")}
          >
            <Text style={styles.loginButtonText}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  const { from, to } = dateRange;
  const displayName = user?.fullName || "Visitor";
  const numNights = from && to ? differenceInDays(to, from) : 0;
  const totalCabinPrice =
    numNights * (cabin?.regularPrice - (cabin?.discount || 0));
  const totalBreakfastPrice =
    hasBreakfast && settings?.breakfastPrice
      ? settings.breakfastPrice * numGuests * numNights
      : 0;
  const totalPrice = totalCabinPrice + totalBreakfastPrice;

  return (
    <LinearGradient
      colors={["#1E293B", "#0F172A"]}
      style={styles.gradientContainer}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* User Header With Card Effect */}
        <View style={styles.userHeaderCard}>
          <LinearGradient
            colors={["#334155", "#1E293B"]}
            style={styles.userHeaderGradient}
          >
            <View style={styles.userInfo}>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.username}>{displayName}</Text>
            </View>
            <View style={styles.userAvatarContainer}>
              <View style={styles.userAvatar}>
                <Ionicons name="person" size={24} color="#FBBF24" />
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Cabin Card Preview */}
        {cabin && (
          <View style={styles.cabinPreviewCard}>
            <View style={styles.cabinHeader}>
              <Text style={styles.cabinName}>{cabin.name}</Text>
              <View style={styles.cabinDetailsBadge}>
                <Ionicons name="bed-outline" size={14} color="#E5E7EB" />
                <Text style={styles.cabinDetailsText}>
                  Max {cabin.maxCapacity} guests
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Date Selector Section */}

        <DateSelector
          settings={
            settings || {
              minBookingLength: 1,
              maxBookingLength: 30,
              maxNumberOfGuests: cabin?.maxCapacity || 8,
            }
          }
          cabin={cabin}
          dateRange={dateRange}
          onDateChange={handleDateChange}
          onReset={handleResetDates}
        />

        {/* Guest Details Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <FontAwesome5 name="users" size={18} color="#FBBF24" />
            <Text style={styles.sectionTitle}>Guest Details</Text>
          </View>

          <View style={styles.formItem}>
            <Text style={styles.formLabel}>Number of Guests</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={numGuests}
                style={styles.picker}
                dropdownIconColor="#E5E7EB"
                onValueChange={(value) => setNumGuests(value)}
              >
                {Array.from(
                  {
                    length:
                      settings?.maxNumberOfGuests || cabin?.maxCapacity || 8,
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
          </View>

          <View style={styles.formItem}>
            <View style={styles.switchContainer}>
              <View>
                <Text style={styles.formLabel}>Include breakfast</Text>
                {settings?.breakfastPrice && (
                  <Text style={styles.breakfastNote}>
                    ${settings.breakfastPrice} per person/night
                  </Text>
                )}
              </View>
              <Switch
                value={hasBreakfast}
                onValueChange={(value) => setHasBreakfast(value)}
                trackColor={{ false: "#334155", true: "#10B981" }}
                thumbColor={hasBreakfast ? "#FBBF24" : "#E5E7EB"}
                ios_backgroundColor="#334155"
              />
            </View>
          </View>
        </View>

        {/* Special Requests Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeaderRow}>
            <MaterialIcons name="note-add" size={20} color="#FBBF24" />
            <Text style={styles.sectionTitle}>Special Requests</Text>
          </View>

          <TextInput
            style={styles.textArea}
            placeholder="Any special requests, allergies, etc."
            placeholderTextColor="#94A3B8"
            value={observations}
            onChangeText={setObservations}
            multiline={true}
            numberOfLines={4}
          />
        </View>

        {/* Price Summary Section */}
        {from && to && (
          <View style={styles.priceSummaryCard}>
            <Text style={styles.summaryTitle}>Price Summary</Text>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>
                {numNights} {numNights === 1 ? "night" : "nights"} × $
                {(cabin?.regularPrice - (cabin?.discount || 0)).toFixed(2)}
              </Text>
              <Text style={styles.summaryPrice}>
                ${totalCabinPrice.toFixed(2)}
              </Text>
            </View>

            {hasBreakfast && settings?.breakfastPrice && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>
                  Breakfast ({numGuests} {numGuests === 1 ? "guest" : "guests"}{" "}
                  × {numNights} {numNights === 1 ? "night" : "nights"})
                </Text>
                <Text style={styles.summaryPrice}>
                  ${totalBreakfastPrice.toFixed(2)}
                </Text>
              </View>
            )}

            <View style={styles.divider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalText}>Total</Text>
              <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
            </View>
          </View>
        )}

        {/* Reserve Button */}
        {from && to ? (
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={handleCreateBooking}
            disabled={isSubmitting}
          >
            <LinearGradient
              colors={
                isSubmitting ? ["#D97706", "#F59E0B"] : ["#F59E0B", "#FBBF24"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.reserveButtonGradient}
            >
              {isSubmitting ? (
                <View style={styles.loadingContainer}>
                  <Ionicons name="hourglass-outline" size={18} color="#FFF" />
                  <Text style={styles.reserveButtonText}>Processing...</Text>
                </View>
              ) : (
                <View style={styles.reserveButtonContent}>
                  <Ionicons name="checkmark-circle" size={18} color="#FFF" />
                  <Text style={styles.reserveButtonText}>
                    Complete Reservation
                  </Text>
                </View>
              )}
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View style={styles.startHintContainer}>
            <Ionicons name="calendar-outline" size={24} color="#FBBF24" />
            <Text style={styles.startHint}>Start by selecting your dates</Text>
          </View>
        )}

        {/* Bottom Padding */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  userHeaderCard: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  userHeaderGradient: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
  },
  userInfo: {
    flexDirection: "column",
  },
  welcomeText: {
    color: "#94A3B8",
    fontSize: 14,
    marginBottom: 4,
  },
  username: {
    color: "#FBBF24",
    fontSize: 20,
    fontWeight: "700",
  },
  userAvatarContainer: {
    shadowColor: "#FBBF24",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(251,191,36,0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(251,191,36,0.3)",
  },
  cabinPreviewCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: "#334155",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cabinHeader: {
    flexDirection: "column",
    gap: 8,
  },
  cabinName: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  cabinDetailsBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    gap: 6,
  },
  cabinDetailsText: {
    color: "#E5E7EB",
    fontSize: 12,
  },
  sectionContainer: {
    marginHorizontal: 16,
    marginTop: 24,
    backgroundColor: "#334155",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  formItem: {
    marginBottom: 16,
  },
  formLabel: {
    color: "#E5E7EB",
    fontSize: 16,
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: "#1E293B",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  picker: {
    color: "#E5E7EB",
    backgroundColor: "transparent",
    height: 50,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  breakfastNote: {
    color: "#94A3B8",
    fontSize: 13,
  },
  textArea: {
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 16,
    color: "#E5E7EB",
    fontSize: 16,
    height: 120,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  priceSummaryCard: {
    marginHorizontal: 16,
    marginTop: 24,
    backgroundColor: "#334155",
    borderRadius: 16,
    padding: 16,
  },
  summaryTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryText: {
    color: "#E5E7EB",
    fontSize: 14,
  },
  summaryPrice: {
    color: "#E5E7EB",
    fontSize: 14,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  totalText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  totalPrice: {
    color: "#10B981",
    fontSize: 18,
    fontWeight: "700",
  },
  reserveButton: {
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#FBBF24",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  reserveButtonGradient: {
    paddingVertical: 16,
    alignItems: "center",
  },
  reserveButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reserveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "700",
  },
  startHintContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "rgba(251,191,36,0.1)",
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(251,191,36,0.3)",
    borderStyle: "dashed",
  },
  startHint: {
    color: "#FBBF24",
    fontSize: 16,
    fontWeight: "500",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  authTitle: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
  },
  messageText: {
    color: "#E5E7EB",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  linkText: {
    color: "#FBBF24",
    textDecorationLine: "underline",
  },
  loginButton: {
    backgroundColor: "rgba(251,191,36,0.2)",
    borderWidth: 1,
    borderColor: "#FBBF24",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginTop: 24,
  },
  loginButtonText: {
    color: "#FBBF24",
    fontSize: 16,
    fontWeight: "600",
  },
});
