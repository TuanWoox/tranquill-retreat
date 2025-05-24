import { useAuthContext } from "@/context/AuthContext";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

function ActionSection({
  bookingStatus,
  onUpdateStatus,
  canEdit,
  canDelete,
  onDelete,
}) {
  const { user } = useAuthContext();
  const router = useRouter();
  if (user.role === "admin")
    return (
      <View className="bg-[#23272f]/95 rounded-2xl mb-4 border border-[#d2af84]/30">
        <View className="flex-row items-center p-4 border-b border-[#d2af84]/20">
          <Ionicons name="settings" size={18} color="#d2af84" />
          <Text className="text-[#d2af84] text-base font-bold ml-2">
            Quick Actions
          </Text>
        </View>
        <View className="p-4">
          <Text className="text-[#94a3b8] text-sm mb-3">
            Update booking status:
          </Text>
          <View className="flex-row flex-wrap gap-2 mb-4">
            {["confirmed", "checked-in", "checked-out"].map((statusOption) => (
              <TouchableOpacity
                key={statusOption}
                className={`px-3 py-2 rounded-lg border ${
                  bookingStatus.toLowerCase() === statusOption
                    ? "bg-[#d2af84] border-[#d2af84]"
                    : "bg-transparent border-[#d2af84]/50"
                }`}
                onPress={() => onUpdateStatus(statusOption)}
              >
                <Text
                  className={`text-xs font-semibold uppercase ${
                    bookingStatus.toLowerCase() === statusOption
                      ? "text-[#23272f]"
                      : "text-[#d2af84]"
                  }`}
                >
                  {statusOption}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  return (
    <View className="flex-row justify-center gap-4 mt-6">
      {canEdit && (
        <TouchableOpacity
          className="bg-[#d2af84] rounded-xl py-3.5 px-6 flex-row items-center gap-2 flex-1 justify-center shadow shadow-[#d2af84]"
          onPress={() => router.push(`/user/booking/${id}/edit`)}
        >
          <AntDesign name="edit" size={18} color="#23272f" />
          <Text className="text-[#23272f] font-bold text-base">
            Edit Booking
          </Text>
        </TouchableOpacity>
      )}
      {canDelete && (
        <TouchableOpacity
          className="bg-[#ff4d4f] rounded-xl py-3.5 px-6 flex-row items-center gap-2 shadow shadow-[#ff4d4f]"
          onPress={onDelete}
        >
          <AntDesign name="delete" size={18} color="#fff" />
          <Text className="text-white font-bold text-base">Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default ActionSection;
