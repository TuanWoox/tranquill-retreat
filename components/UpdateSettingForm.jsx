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
      <View className="flex-1 justify-center items-center px-6 py-8">
        <Text className="text-2xl font-extrabold mb-6 text-[#d2af84] tracking-wide drop-shadow-lg">
          Update Settings
        </Text>

        {/* Min Booking Length */}
        <View className="w-full mb-4">
          <Text className="text-[#d2af84] mb-1 font-semibold">
            Minimum Booking Length
          </Text>
          <Controller
            control={control}
            name="minBookingLength"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <>
                <TextInput
                  value={field.value?.toString()}
                  onBlur={field.onBlur}
                  onChangeText={(text) => field.onChange(Number(text))}
                  placeholder="Minimum Booking Length"
                  placeholderTextColor="#bbb"
                  keyboardType="numeric"
                  className="w-full border border-[#d2af84] rounded-lg p-3 text-white bg-black/40"
                />
                {errors.minBookingLength && (
                  <Text className="text-red-400 text-xs mt-1">
                    {errors.minBookingLength.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        {/* Max Booking Length */}
        <View className="w-full mb-4">
          <Text className="text-[#d2af84] mb-1 font-semibold">
            Maximum Booking Length
          </Text>
          <Controller
            control={control}
            name="maxBookingLength"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <>
                <TextInput
                  value={field.value?.toString()}
                  onBlur={field.onBlur}
                  onChangeText={(text) => field.onChange(Number(text))}
                  placeholder="Maximum Booking Length"
                  placeholderTextColor="#bbb"
                  keyboardType="numeric"
                  className="w-full border border-[#d2af84] rounded-lg p-3 text-white bg-black/40"
                />
                {errors.maxBookingLength && (
                  <Text className="text-red-400 text-xs mt-1">
                    {errors.maxBookingLength.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        {/* Max Number Of Guests */}
        <View className="w-full mb-4">
          <Text className="text-[#d2af84] mb-1 font-semibold">
            Maximum Number of Guests
          </Text>
          <Controller
            control={control}
            name="maxNumberOfGuests"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <>
                <TextInput
                  value={field.value?.toString()}
                  onBlur={field.onBlur}
                  onChangeText={(text) => field.onChange(Number(text))}
                  placeholder="Maximum Number of Guests"
                  placeholderTextColor="#bbb"
                  keyboardType="numeric"
                  className="w-full border border-[#d2af84] rounded-lg p-3 text-white bg-black/40"
                />
                {errors.maxNumberOfGuests && (
                  <Text className="text-red-400 text-xs mt-1">
                    {errors.maxNumberOfGuests.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        {/* Breakfast Price */}
        <View className="w-full mb-4">
          <Text className="text-[#d2af84] mb-1 font-semibold">
            Breakfast Price
          </Text>
          <Controller
            control={control}
            name="breakfastPrice"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <>
                <TextInput
                  value={field.value?.toString()}
                  onBlur={field.onBlur}
                  onChangeText={(text) => field.onChange(Number(text))}
                  placeholder="Breakfast Price"
                  placeholderTextColor="#bbb"
                  keyboardType="numeric"
                  className="w-full border border-[#d2af84] rounded-lg p-3 text-white bg-black/40"
                />
                {errors.breakfastPrice && (
                  <Text className="text-red-400 text-xs mt-1">
                    {errors.breakfastPrice.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity
          className="w-full bg-[#d2af84] p-4 rounded-lg mt-4"
          onPress={handleSubmit(handleSave)}
          disabled={isLoading}
        >
          <Text className="text-center text-black font-bold text-base tracking-wide">
            {isLoading ? "Saving..." : "Save Settings"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
