import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { differenceInDays } from "date-fns";
import { useGetBookedDates } from "@/hooks/useGetBookedDates";

const { width } = Dimensions.get("window");

export default function DateSelector({
  settings,
  cabin,
  dateRange,
  onDateChange,
  onReset,
}) {
  const { bookedDates = [], isLoading } = useGetBookedDates(cabin?._id);
  const { from, to } = dateRange;
  // Compute number of nights & price
  const numNights = from && to ? differenceInDays(to, from) : 0;
  const nightlyPrice = cabin.discount
    ? cabin.regularPrice - cabin.discount
    : cabin.regularPrice;
  const totalPrice = numNights * nightlyPrice;

  // Build markedDates for react-native-calendars
  const marked = {};
  if (from)
    marked[from.toISOString().split("T")[0]] = {
      startingDay: true,
      color: "#10B981",
    };
  if (to)
    marked[to.toISOString().split("T")[0]] = {
      endingDay: true,
      color: "#10B981",
    };
  if (from && to) {
    // fill in between
    let cursor = new Date(from);
    while (cursor < to) {
      cursor = new Date(cursor.setDate(cursor.getDate() + 1));
      const d = cursor.toISOString().split("T")[0];
      if (d !== to.toISOString().split("T")[0]) {
        marked[d] = { color: "#A7F3D0" };
      }
    }
  }

  // Disable past and booked dates - Use safe array access
  const disabled = {};
  // Use optional chaining to safely handle undefined bookedDates
  bookedDates?.forEach((d) => {
    if (d) {
      // Add additional check for each date item
      const key = new Date(d).toISOString().split("T")[0];
      disabled[key] = { disabled: true, disableTouchEvent: true };
    }
  });
  // Handler when user selects a day
  const onDayPress = (day) => {
    const selected = new Date(day.dateString);
    // if no from, start new range
    if (!from || (from && to)) {
      onDateChange({ from: selected, to: null });
      return;
    }

    // if selecting backwards, restart
    if (selected <= from) {
      onDateChange({ from: selected, to: null });
      return;
    }

    const length = differenceInDays(selected, from);
    if (
      length < settings.minBookingLength ||
      length > settings.maxBookingLength
    ) {
      // ignore or you could flash a warning
      return;
    }

    // finalize range
    onDateChange({ from, to: selected });
  };

  return (
    <View style={styles.wrapper}>
      <Calendar
        style={styles.calendar}
        current={new Date().toISOString().split("T")[0]}
        minDate={new Date().toISOString().split("T")[0]}
        onDayPress={onDayPress}
        markingType={"period"}
        markedDates={{ ...marked, ...disabled }}
        theme={{
          todayTextColor: "#FBBF24",
          arrowColor: "#FBBF24",
          monthTextColor: "#FBBF24",
          dayTextColor: "#E5E7EB",
          calendarBackground: "#1E293B",
          textDisabledColor: "#6B7280",
        }}
      />

      <View style={styles.summary}>
        <View>
          <Text style={styles.priceLabel}>
            {nightlyPrice.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}{" "}
            / night
          </Text>
          {numNights > 0 && (
            <Text style={styles.totalLabel}>
              {numNights} night{numNights !== 1 ? "s" : ""} ={" "}
              {totalPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </Text>
          )}
        </View>
        {(from || to) && (
          <TouchableOpacity style={styles.clearBtn} onPress={onReset}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 16,
    borderRadius: 12,
    overflow: "hidden",
    width: width - 32,
    alignSelf: "center",
    backgroundColor: "#1E293B",
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#334155",
  },
  priceLabel: {
    color: "#FBBF24",
    fontSize: 16,
    fontWeight: "600",
  },
  totalLabel: {
    color: "#E5E7EB",
    fontSize: 14,
    marginTop: 4,
  },
  clearBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#FBBF24",
    borderRadius: 6,
  },
  clearText: {
    color: "#FBBF24",
    fontSize: 14,
    fontWeight: "500",
  },
});
