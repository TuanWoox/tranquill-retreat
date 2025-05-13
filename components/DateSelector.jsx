import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { differenceInDays } from "date-fns";
import { useGetBookedDates } from "@/hooks/useGetBookedDates";
import { Ionicons } from "@expo/vector-icons";

export default function DateSelector({
  settings,
  cabin,
  dateRange,
  onDateChange,
  onReset,
}) {
  const {
    data: bookedDates = [],
    isLoading,
    error,
    isSuccess,
  } = useGetBookedDates(cabin?._id);

  useEffect(() => {
    if (isSuccess) {
      console.log("Updated booked dates:", bookedDates);
    }
  }, [bookedDates, isSuccess]);

  const { from, to } = dateRange;
  const numNights = from && to ? differenceInDays(to, from) : 0;
  const nightlyPrice = cabin?.discount
    ? cabin.regularPrice - cabin.discount
    : cabin.regularPrice;
  const totalPrice = numNights * nightlyPrice;

  // Build markedDates for react-native-calendars
  const marked = {};
  if (from)
    marked[from.toISOString().split("T")[0]] = {
      startingDay: true,
      color: "#4f46e5",
      textColor: "#FFFFFF",
    };
  if (to)
    marked[to.toISOString().split("T")[0]] = {
      endingDay: true,
      color: "#4f46e5",
      textColor: "#FFFFFF",
    };
  if (from && to) {
    let cursor = new Date(from);
    while (cursor < to) {
      cursor = new Date(cursor.setDate(cursor.getDate() + 1));
      const d = cursor.toISOString().split("T")[0];
      if (d !== to.toISOString().split("T")[0]) {
        marked[d] = { color: "#6366f1", textColor: "#FFFFFF" };
      }
    }
  }

  // Disable booked dates
  const disabled = {};
  if (isSuccess && bookedDates?.length > 0) {
    bookedDates.forEach((d) => {
      if (d) {
        const key = new Date(d).toISOString().split("T")[0];
        disabled[key] = {
          disabled: true,
          disableTouchEvent: true,
          marked: true,
          dotColor: "#EF4444",
        };
      }
    });
  }

  const onDayPress = (day) => {
    const selected = new Date(day.dateString);
    if (!from || (from && to)) {
      onDateChange({ from: selected, to: null });
      return;
    }

    if (selected <= from) {
      onDateChange({ from: selected, to: null });
      return;
    }

    const length = differenceInDays(selected, from);
    if (
      length < settings.minBookingLength ||
      length > settings.maxBookingLength
    ) {
      return;
    }

    onDateChange({ from, to: selected });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Select Your Dates</Text>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#FDBB30" />
            <Text style={styles.loadingText}>Loading availability...</Text>
          </View>
        )}
      </View>

      <Calendar
        style={styles.calendar}
        current={new Date().toISOString().split("T")[0]}
        minDate={new Date().toISOString().split("T")[0]}
        onDayPress={onDayPress}
        markingType={"period"}
        markedDates={{ ...marked, ...disabled }}
        theme={{
          todayTextColor: "#FDBB30",
          arrowColor: "#FDBB30",
          monthTextColor: "#FFFFFF",
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
          textDayFontWeight: "400",
          textMonthFontWeight: "600",
          textDayHeaderFontWeight: "500",
          dayTextColor: "#FFFFFF",
          calendarBackground: "#1E293B",
          textDisabledColor: "#64748B",
          textSectionTitleColor: "#94A3B8",
          selectedDayBackgroundColor: "#FDBB30",
          selectedDayTextColor: "#0F172A",
        }}
      />

      <View style={styles.dateDisplay}>
        <View style={styles.dateBox}>
          <Text style={styles.dateLabel}>CHECK IN</Text>
          <Text style={styles.dateValue}>
            {from ? from.toLocaleDateString() : "Select date"}
          </Text>
        </View>
        <View style={styles.dateSeparator} />
        <View style={styles.dateBox}>
          <Text style={styles.dateLabel}>CHECK OUT</Text>
          <Text style={styles.dateValue}>
            {to ? to.toLocaleDateString() : "Select date"}
          </Text>
        </View>
      </View>

      <View style={styles.summary}>
        <View>
          <Text style={styles.priceLabel}>
            <Text style={styles.price}>${nightlyPrice.toLocaleString()}</Text>{" "}
            <Text style={styles.perNight}>per night</Text>
          </Text>
          {numNights > 0 && (
            <Text style={styles.totalLabel}>
              {numNights} night{numNights !== 1 ? "s" : ""} ={" "}
              <Text style={styles.totalPrice}>
                ${totalPrice.toLocaleString()}
              </Text>
            </Text>
          )}
        </View>
        {(from || to) && (
          <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
            <Ionicons name="refresh-outline" size={16} color="#FFFFFF" />
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 16,
    borderRadius: 16,
    overflow: "hidden",
    alignSelf: "stretch", // Changed from fixed width to stretch
    backgroundColor: "#1E293B",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#94A3B8",
  },
  calendar: {
    paddingBottom: 8,
    backgroundColor: "#1E293B",
  },
  dateDisplay: {
    flexDirection: "row",
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#334155",
  },
  dateBox: {
    flex: 1,
    alignItems: "center",
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#94A3B8",
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  dateSeparator: {
    width: 1,
    backgroundColor: "#334155",
    marginHorizontal: 8,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  priceLabel: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    color: "#FDBB30",
    fontSize: 22,
    fontWeight: "700",
  },
  perNight: {
    color: "#94A3B8",
    fontSize: 16,
  },
  totalLabel: {
    color: "#FFFFFF",
    fontSize: 15,
    marginTop: 6,
  },
  totalPrice: {
    color: "#FDBB30",
    fontWeight: "600",
  },
  resetBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(253, 187, 48, 0.2)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  resetText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 4,
  },
});
