import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { format, isToday, formatDistance, parseISO } from "date-fns";
const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function StayDurationSection({ startDate, endDate, numDates }) {
  return (
    <View className="bg-[#23272f]/95 rounded-2xl mb-4 border border-[#d2af84]/30">
      <View className="flex-row items-center p-4 border-b border-[#d2af84]/20">
        <AntDesign name="calendar" size={20} color="#d2af84" />
        <Text className="text-[#d2af84] text-base font-bold ml-2">
          Stay Duration
        </Text>
      </View>
      <View className="p-4">
        <View className="flex-row items-center justify-between mb-4">
          <View className="items-center flex-1">
            <Text className="text-[#94a3b8] text-xs uppercase font-semibold mb-1">
              Check-in
            </Text>
            <Text className="text-white text-lg font-bold">
              {format(new Date(startDate), "MMM dd")}
            </Text>
            <Text className="text-[#d2af84] text-sm font-medium">
              {format(new Date(startDate), "yyyy")}
            </Text>
            <Text className="text-[#94a3b8] text-xs italic mt-1">
              {isToday(new Date(startDate))
                ? "Today"
                : formatDistanceFromNow(startDate)}
            </Text>
          </View>
          <View className="flex-row items-center px-4">
            <View className="h-px bg-[#d2af84] flex-1" />
            <AntDesign name="arrowright" size={16} color="#d2af84" />
            <View className="h-px bg-[#d2af84] flex-1" />
          </View>
          <View className="items-center flex-1">
            <Text className="text-[#94a3b8] text-xs uppercase font-semibold mb-1">
              Check-out
            </Text>
            <Text className="text-white text-lg font-bold">
              {format(new Date(endDate), "MMM dd")}
            </Text>
            <Text className="text-[#d2af84] text-sm font-medium">
              {format(new Date(endDate), "yyyy")}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center justify-center bg-[#d2af84]/10 p-3 rounded-lg">
          <MaterialIcons name="hotel" size={18} color="#d2af84" />
          <Text className="text-[#d2af84] text-base font-bold ml-2">
            {numDates} dates
          </Text>
        </View>
      </View>
    </View>
  );
}

export default StayDurationSection;
