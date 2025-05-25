import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { format, isToday, formatDistance, parseISO } from "date-fns";
function FinSummarySection({
  numDates,
  cabinPrice,
  extrasPrice,
  totalPrice,
  createdAt,
  isPaid,
}) {
  const getPaymentStatusColor = () => (isPaid ? "#10b981" : "#ff4d4f");
  return (
    <View className="bg-[#23272f]/95 rounded-2xl mb-4 border-2 border-[#d2af84]">
      <View className="flex-row items-center p-4 border-b border-[#d2af84]/20">
        <AntDesign name="creditcard" size={18} color="#d2af84" />
        <Text className="text-[#d2af84] text-base font-bold ml-2">
          Financial Summary
        </Text>
      </View>
      <View className="p-4">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-white text-base">
            Cabin Price ({numDates} dates)
          </Text>
          <Text className="text-white text-lg font-semibold">
            ${cabinPrice}
          </Text>
        </View>
        <View className="flex-row justify-between items-center mb-3">
          <Text className="text-white text-base">Breakfast & Extras</Text>
          <Text className="text-white text-lg font-semibold">
            ${extrasPrice}
          </Text>
        </View>
        <View className="h-px bg-[#d2af84]/30 my-3" />
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-[#d2af84] text-xl font-bold">Total Amount</Text>
          <Text className="text-[#d2af84] text-2xl font-bold">
            ${totalPrice}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <AntDesign name="clockcircleo" size={14} color="#94a3b8" />
            <Text className="text-[#94a3b8] text-sm ml-2">
              Booked: {format(new Date(createdAt), "MMM dd, yyyy")}
            </Text>
          </View>
          <View
            className="px-3 py-1 rounded-full"
            style={{ backgroundColor: getPaymentStatusColor() }}
          >
            <Text className="text-white text-xs font-bold">
              {isPaid ? "PAYMENT RECEIVED" : "PAYMENT PENDING"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default FinSummarySection;
