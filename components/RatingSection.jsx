import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useSubmitRating } from "@/hooks/useCreateRate"; // Import the hook

function RatingSection({ bookingId, cabinId, cabinName, existingRating }) {
  const [rating, setRating] = useState(existingRating?.rating || 0);
  const [comment, setComment] = useState(existingRating?.comment || "");

  // Use the hook instead of manual state management
  const { submitRatingFn, isLoading } = useSubmitRating();

  const handleRatingSubmit = () => {
    if (rating === 0) {
      Toast.show({
        type: "error",
        text1: "Rating Required",
        text2: "Please select a star rating",
      });
      return;
    }

    // Call the mutation function from the hook
    submitRatingFn({
      bookingId,
      cabinId,
      rating,
      comment,
      // If this is an update, include the rating ID if you have it
      ratingId: existingRating?._id,
    });
  };

  return (
    <View className="bg-[#23272f]/95 rounded-2xl p-5 mb-4 border border-[#d2af84]/30">
      <View className="flex-row items-center mb-4">
        <AntDesign name="star" size={20} color="#d2af84" />
        <Text className="text-[#d2af84] text-lg font-bold ml-2">
          Rate Your Stay at {cabinName}
        </Text>
      </View>

      {/* Star Rating */}
      <View className="flex-row justify-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            className="mx-1"
          >
            <AntDesign
              name={star <= rating ? "star" : "staro"}
              size={32}
              color={star <= rating ? "#FBBF24" : "#64748b"}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Comment Input */}
      <Text className="text-white text-base mb-2">Your Review (Optional)</Text>
      <TextInput
        className="bg-[#1a1d23] rounded-xl p-4 text-white text-base border border-[#d2af84]/30 mb-4"
        placeholder="Share your experience..."
        placeholderTextColor="#94A3B8"
        value={comment}
        onChangeText={setComment}
        multiline={true}
        numberOfLines={3}
        style={{ textAlignVertical: "top" }}
      />

      {/* Submit Button */}
      <TouchableOpacity
        className={`rounded-xl py-3 px-6 ${
          rating > 0 ? "bg-[#d2af84]" : "bg-gray-600"
        }`}
        onPress={handleRatingSubmit}
        disabled={rating === 0 || isLoading}
      >
        <Text
          className={`text-center font-bold ${
            rating > 0 ? "text-[#23272f]" : "text-gray-400"
          }`}
        >
          {isLoading
            ? "Submitting..."
            : existingRating
            ? "Update Rating"
            : "Submit Rating"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default RatingSection;
