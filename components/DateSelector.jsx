import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
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
    <View
      className="my-4 rounded-2xl overflow-hidden self-stretch bg-slate-800 shadow-md"
      style={{ elevation: 5 }}
    >
      <View className="flex-row justify-between items-center p-4 border-b border-slate-600">
        <Text className="text-xl font-semibold text-white">
          Select Your Dates
        </Text>
        {isLoading && (
          <View className="flex-row items-center">
            <ActivityIndicator size="small" color="#FDBB30" />
            <Text className="ml-2 text-sm text-slate-400">
              Loading availability...
            </Text>
          </View>
        )}
      </View>

      <Calendar
        className="pb-2 bg-slate-800"
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

      <View className="flex-row p-4 border-t border-b border-slate-600">
        <View className="flex-1 items-center">
          <Text className="text-xs font-semibold text-slate-400 mb-1">
            CHECK IN
          </Text>
          <Text className="text-base font-medium text-white">
            {from ? from.toLocaleDateString() : "Select date"}
          </Text>
        </View>
        <View className="w-px bg-slate-600 mx-2" />
        <View className="flex-1 items-center">
          <Text className="text-xs font-semibold text-slate-400 mb-1">
            CHECK OUT
          </Text>
          <Text className="text-base font-medium text-white">
            {to ? to.toLocaleDateString() : "Select date"}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center p-4">
        <View>
          <Text className="flex-row items-baseline">
            <Text className="text-[22px] font-bold text-amber-400">
              ${nightlyPrice.toLocaleString()}
            </Text>
            <Text className="text-base text-slate-400"> per night</Text>
          </Text>
          {numNights > 0 && (
            <Text className="text-white text-sm mt-1.5">
              {numNights} night{numNights !== 1 ? "s" : ""} ={" "}
              <Text className="text-amber-400 font-semibold">
                ${totalPrice.toLocaleString()}
              </Text>
            </Text>
          )}
        </View>
        {(from || to) && (
          <TouchableOpacity
            className="flex-row items-center bg-amber-400/20 py-2 px-4 rounded-lg"
            onPress={onReset}
          >
            <Ionicons name="refresh-outline" size={16} color="#FFFFFF" />
            <Text className="text-white font-semibold text-sm ml-1">Reset</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
