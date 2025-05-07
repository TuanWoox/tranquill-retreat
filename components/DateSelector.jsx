import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { differenceInDays, isWithinInterval } from "date-fns";
import { useReservation } from "./ReservationContext";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(new Date(date), { start: range.from, end: range.to })
    )
  );
}

function DateSelector({ settings, cabin, bookedDates }) {
  const { range, setRange, resetRange } = useReservation();
  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range;
  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const cabinPrice = numNights * (regularPrice - discount);

  const minBookingLength = settings.miniBookingLength;

  const handleDayPress = (day) => {
    if (!range.from || (range.from && range.to)) {
      setRange({ from: new Date(day.dateString), to: null });
    } else {
      setRange({ ...range, to: new Date(day.dateString) });
    }
  };

  const markedDates = {};
  if (range.from) {
    markedDates[range.from.toISOString().split("T")[0]] = {
      startingDay: true,
      color: "#70d7c7",
      textColor: "white",
    };
  }
  if (range.to) {
    markedDates[range.to.toISOString().split("T")[0]] = {
      endingDay: true,
      color: "#70d7c7",
      textColor: "white",
    };
  }
  if (range.from && range.to) {
    let currentDate = new Date(range.from);
    while (currentDate <= range.to) {
      const dateString = currentDate.toISOString().split("T")[0];
      if (!markedDates[dateString]) {
        markedDates[dateString] = { color: "#d7f0e3", textColor: "black" };
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  bookedDates.forEach((date) => {
    const dateString = new Date(date).toISOString().split("T")[0];
    markedDates[dateString] = { disabled: true, disableTouchEvent: true };
  });

  return (
    <View style={styles.container}>
      <Calendar
        markingType={"period"}
        markedDates={markedDates}
        onDayPress={handleDayPress}
        minDate={new Date().toISOString().split("T")[0]}
      />

      <View style={styles.priceContainer}>
        <View>
          <Text style={styles.priceText}>
            {discount > 0 ? (
              <>
                <Text style={styles.discountedPrice}>
                  ${regularPrice - discount}
                </Text>
                <Text style={styles.originalPrice}> ${regularPrice}</Text>
              </>
            ) : (
              <Text style={styles.discountedPrice}>${regularPrice}</Text>
            )}
            <Text> /night</Text>
          </Text>
          {numNights ? (
            <View style={styles.totalContainer}>
              <Text style={styles.nightsText}>× {numNights} nights</Text>
              <Text style={styles.totalText}>Total: ${cabinPrice}</Text>
            </View>
          ) : null}
        </View>

        {displayRange.from || displayRange.to ? (
          <Button title="Clear" onPress={resetRange} />
        ) : null}
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
  priceContainer: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  priceText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  discountedPrice: {
    fontSize: 20,
    color: "#4caf50",
  },
  originalPrice: {
    fontSize: 16,
    textDecorationLine: "line-through",
    color: "#9e9e9e",
  },
  totalContainer: {
    marginTop: 8,
  },
  nightsText: {
    fontSize: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});

export default DateSelector;
