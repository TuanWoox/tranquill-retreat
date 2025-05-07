import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  Picker,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { createBooking } from "../services/action";

function ReservationForm({ cabin, user }) {
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;
  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Logged in as</Text>
        <View style={styles.userInfo}>
          <Image
            style={styles.userImage}
            source={{ uri: user.image }}
            alt={user.name}
          />
          <Text style={styles.userName}>{user.name}</Text>
        </View>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>How many guests?</Text>
          <Picker
            style={styles.picker}
            selectedValue=""
            onValueChange={(value) => {
              console.log("Selected number of guests:", value);
            }}
          >
            <Picker.Item label="Select number of guests..." value="" />
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <Picker.Item
                label={`${x} ${x === 1 ? "guest" : "guests"}`}
                value={x}
                key={x}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>
            Anything we should know about your stay?
          </Text>
          <TextInput
            style={styles.textArea}
            placeholder="Any pets, allergies, special requirements, etc.?"
            multiline
          />
        </View>

        <View style={styles.footer}>
          {!(startDate && endDate) ? (
            <Text style={styles.infoText}>Start by selecting dates</Text>
          ) : (
            <TouchableOpacity
              style={styles.submitButton}
              onPress={async () => {
                await createBookingWithData();
                resetRange();
              }}
            >
              <Text style={styles.submitButtonText}>Reserve now</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a202c",
  },
  header: {
    backgroundColor: "#2d3748",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "#a0aec0",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  userName: {
    color: "#a0aec0",
  },
  form: {
    padding: 16,
    backgroundColor: "#1a202c",
    flex: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    color: "#a0aec0",
    marginBottom: 8,
  },
  picker: {
    backgroundColor: "#e2e8f0",
    color: "#1a202c",
    borderRadius: 4,
  },
  textArea: {
    backgroundColor: "#e2e8f0",
    color: "#1a202c",
    borderRadius: 4,
    padding: 8,
    height: 100,
    textAlignVertical: "top",
  },
  footer: {
    marginTop: 16,
    alignItems: "flex-end",
  },
  infoText: {
    color: "#a0aec0",
  },
  submitButton: {
    backgroundColor: "#4a5568",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  submitButtonText: {
    color: "#edf2f7",
  },
});

export default ReservationForm;
