import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useUpdateSetting } from "@/hooks/useUpdateSetting";
export default function UpdateSettingForm({ setting, onSubmit }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      minBookingLength: setting.minBookingLength,
      maxBookingLength: setting.maxBookingLength,
      maxNumberOfGuests: setting.maxNumberOfGuests,
      breakfastPrice: setting.breakfastPrice,
    },
  });
  const { updateSettingFn, isLoading, error } = useUpdateSetting();

  const handleSave = (formData) => {
    try {
      updateSettingFn(formData);
    } catch (error) {
      Alert.alert("Update Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <View className="flex-1 justify-center items-center px-6 py-12">
        <Text className="text-2xl font-bold mb-6 text-white">
          Cập nhật cài đặt
        </Text>

        {/* Min Booking Length */}
        <View className="w-full mb-4">
          <Text className="text-white mb-1">Thời gian đặt tối thiểu</Text>
          <Controller
            control={control}
            name="minBookingLength"
            rules={{ required: "Không được để trống" }}
            render={({ field }) => (
              <>
                <TextInput
                  value={field.value?.toString()}
                  onBlur={field.onBlur}
                  onChangeText={(text) => field.onChange(Number(text))}
                  placeholder="Min Booking Length"
                  placeholderTextColor="#ddd"
                  keyboardType="numeric"
                  className="w-full border border-white rounded-md p-3 text-white"
                />
                {errors.minBookingLength && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.minBookingLength.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        {/* Max Booking Length */}
        <View className="w-full mb-4">
          <Text className="text-white mb-1">Thời gian đặt tối đa</Text>
          <Controller
            control={control}
            name="maxBookingLength"
            rules={{ required: "Không được để trống" }}
            render={({ field }) => (
              <>
                <TextInput
                  value={field.value?.toString()}
                  onBlur={field.onBlur}
                  onChangeText={(text) => field.onChange(Number(text))}
                  placeholder="Max Booking Length"
                  placeholderTextColor="#ddd"
                  keyboardType="numeric"
                  className="w-full border border-white rounded-md p-3 text-white"
                />
                {errors.maxBookingLength && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.maxBookingLength.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        {/* Max Number Of Guests */}
        <View className="w-full mb-4">
          <Text className="text-white mb-1">Số lượng khách tối đa</Text>
          <Controller
            control={control}
            name="maxNumberOfGuests"
            rules={{ required: "Không được để trống" }}
            render={({ field }) => (
              <>
                <TextInput
                  value={field.value?.toString()}
                  onBlur={field.onBlur}
                  onChangeText={(text) => field.onChange(Number(text))}
                  placeholder="Max Number Of Guests"
                  placeholderTextColor="#ddd"
                  keyboardType="numeric"
                  className="w-full border border-white rounded-md p-3 text-white"
                />
                {errors.maxNumberOfGuests && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.maxNumberOfGuests.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        {/* Breakfast Price */}
        <View className="w-full mb-4">
          <Text className="text-white mb-1">Giá bữa sáng</Text>
          <Controller
            control={control}
            name="breakfastPrice"
            rules={{ required: "Không được để trống" }}
            render={({ field }) => (
              <>
                <TextInput
                  value={field.value?.toString()}
                  onBlur={field.onBlur}
                  onChangeText={(text) => field.onChange(Number(text))}
                  placeholder="Breakfast Price"
                  placeholderTextColor="#ddd"
                  keyboardType="numeric"
                  className="w-full border border-white rounded-md p-3 text-white"
                />
                {errors.breakfastPrice && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.breakfastPrice.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          className="w-full bg-[#d2af84] p-4 rounded-md mt-4"
          onPress={handleSubmit(handleSave)}
        >
          <Text className="text-center text-black font-semibold">
            {isLoading ? "Đang lưu cài đặt" : "Lưu cài đặt"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
