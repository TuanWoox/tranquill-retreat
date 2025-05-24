import { useAuthContext } from "@/context/AuthContext";
import { Text, View } from "react-native";

function HeaderSection({ statusColor, id, bookingStatus, bookingId }) {
  const { user } = useAuthContext();
  if (user.role === "admin")
    return (
      <View className="mb-6">
        <View className="bg-[#23272f]/95 rounded-2xl p-5 border-2 border-[#d2af84]">
          <View className="flex-col justify-between items-center mb-3">
            <View>
              <Text className="text-[#d2af84] text-2xl font-bold">
                Admin - Booking Management
              </Text>
              <Text className="text-[#94a3b8] text-sm font-medium mt-1">
                ID: #{bookingId.slice(-8).toUpperCase()}
              </Text>
            </View>
            <View className="mt-2 flex-row items-center">
              <Text
                className="text-xs font-bold uppercase px-3 py-1 rounded-full"
                style={{ backgroundColor: statusColor, color: "#fff" }}
              >
                {bookingStatus || "Unknown"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  return (
    <View className="mb-6">
      <View className="bg-[#23272f]/95 rounded-2xl p-5 border border-[#d2af84]">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-[#d2af84] text-2xl font-bold">
            Booking Details
          </Text>
          <View
            className={`px-3 py-1 rounded-full `}
            style={{ backgroundColor: statusColor }}
          >
            <Text className="text-white text-xs font-bold uppercase">
              {bookingStatus}
            </Text>
          </View>
        </View>
        <Text className="text-[#94a3b8] text-sm font-medium">
          ID: #{id.slice(-8).toUpperCase()}
        </Text>
      </View>
    </View>
  );
}

export default HeaderSection;
