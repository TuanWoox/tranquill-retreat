import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Calendar } from "react-native-calendars";
import { differenceInDays } from "date-fns";
import { useGetBookedDates } from "@/hooks/useGetBookedDates";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

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
      color: "#d2af84",
      textColor: "#FFFFFF",
    };
  if (to)
    marked[to.toISOString().split("T")[0]] = {
      endingDay: true,
      color: "#d2af84",
      textColor: "#FFFFFF",
    };
  if (from && to) {
    let cursor = new Date(from);
    while (cursor < to) {
      cursor = new Date(cursor.setDate(cursor.getDate() + 1));
      const d = cursor.toISOString().split("T")[0];
      if (d !== to.toISOString().split("T")[0]) {
        marked[d] = { color: "#e4cea3", textColor: "#0F172A" };
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
    <LinearGradient
      colors={["rgba(15, 23, 42, 0.55)", "rgba(30, 41, 59, 0.55)"]}
      className="mx-4 my-3 rounded-3xl overflow-hidden shadow-lg border border-[#d2af84]/20"
      style={{ elevation: 3 }}
    >
      <View className="flex-row justify-between items-center p-3 border-b border-[#d2af84]/10">
        <Text className="text-2xl font-semibold text-[#d2af84]">
          Select Your Dates
        </Text>
        {isLoading && (
          <View className="flex-row items-center">
            <ActivityIndicator size="small" color="#d2af84" />
            <Text className="ml-2 text-xs text-slate-400">Loading...</Text>
          </View>
        )}
      </View>

      <Calendar
        className="pb-1 bg-transparent"
        current={new Date().toISOString().split("T")[0]}
        minDate={new Date().toISOString().split("T")[0]}
        onDayPress={onDayPress}
        markingType={"period"}
        markedDates={{ ...marked, ...disabled }}
        theme={{
          todayTextColor: "#d2af84",
          arrowColor: "#d2af84",
          monthTextColor: "#FFFFFF",
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 12,
          textDayFontWeight: "400",
          textMonthFontWeight: "600",
          textDayHeaderFontWeight: "500",
          dayTextColor: "#FFFFFF",
          calendarBackground: "transparent",
          textDisabledColor: "#64748B",
          textSectionTitleColor: "#94A3B8",
          selectedDayBackgroundColor: "#d2af84",
          selectedDayTextColor: "#0F172A",
        }}
      />

      <View className="flex-row p-3 border-t border-b border-[#d2af84]/10">
        <View className="flex-1 items-center">
          <Text className="text-xs font-semibold text-slate-400">CHECK IN</Text>
          <Text className="text-lg font-medium text-white">
            {from ? from.toLocaleDateString() : "Select date"}
          </Text>
        </View>
        <View className="w-px bg-slate-600/50 mx-2" />
        <View className="flex-1 items-center">
          <Text className="text-xs font-semibold text-slate-400">
            CHECK OUT
          </Text>
          <Text className="text-lg font-medium text-white">
            {to ? to.toLocaleDateString() : "Select date"}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center p-3">
        <View>
          <Text className="flex-row items-baseline">
            <Text className="text-2xl font-bold text-[#d2af84]">
              ${nightlyPrice.toLocaleString()}
            </Text>
            <Text className="text-lg text-slate-400"> per night</Text>
          </Text>
          {numNights > 0 && (
            <Text className="text-white text-xs mt-1">
              {numNights} night{numNights !== 1 ? "s" : ""} ={" "}
              <Text className="text-[#d2af84] font-semibold">
                ${totalPrice.toLocaleString()}
              </Text>
            </Text>
          )}
        </View>
        {(from || to) && (
          <TouchableOpacity
            className="flex-row items-center bg-[#d2af84]/10 py-1.5 px-3 rounded-lg border border-[#d2af84]/20"
            onPress={onReset}
          >
            <Ionicons name="refresh-outline" size={14} color="#FFFFFF" />
            <Text className="text-white font-medium text-xs ml-1">Reset</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}
