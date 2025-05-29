import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useSubmitRating } from "@/hooks/useCreateRate";
import { useUpdateRating } from "@/hooks/useUpdateRating";
import { useDeleteRating } from "@/hooks/useDeleteRating";
import { LinearGradient } from "expo-linear-gradient";
import { useGetRatingByBookingId } from "@/hooks/useGetRateByBookingId";

function RatingSection({ bookingId, cabinId, cabinName }) {
  // Fetch existing rating for this booking
  const {
    data: existingRating,
    isLoading: isLoadingRating,
    refetch: refetchRating,
  } = useGetRatingByBookingId(bookingId);

  const [rating, setRating] = useState(existingRating?.rating || 0);
  const [comment, setComment] = useState(existingRating?.comment || "");
  const [isEditing, setIsEditing] = useState(!existingRating);

  // Use hooks
  const { submitRatingFn, isLoading: isSubmitting } = useSubmitRating();
  const { mutate: updateRatingFn, isLoading: isUpdating } = useUpdateRating();
  const { mutate: deleteRatingFn, isLoading: isDeleting } = useDeleteRating();

  // Update local state when existing rating loads
  React.useEffect(() => {
    if (existingRating) {
      setRating(existingRating.rating || 0);
      setComment(existingRating.comment || "");
      setIsEditing(false); // Start in view mode if there's an existing rating
    }
  }, [existingRating]);

  const handleRatingSubmit = () => {
    if (rating === 0) {
      Toast.show({
        type: "error",
        text1: "Rating Required",
        text2: "Please select a star rating",
      });
      return;
    }

    submitRatingFn({
      bookingId,
      cabinId,
      rating,
      comment,
    });
  };

  // Then fix the handleRatingUpdate function
  const handleRatingUpdate = () => {
    if (rating === 0) {
      Toast.show({
        type: "error",
        text1: "Rating Required",
        text2: "Please select a star rating",
      });
      return;
    }

    // Make sure existingRating has an _id property
    if (!existingRating || !existingRating._id) {
      console.error("Missing rating ID for update");
      Toast.show({
        type: "error",
        text1: "Update Failed",
        text2: "Cannot find the rating to update",
      });
      return;
    }

    // The key change is here - make sure we're only sending what the API expects
    updateRatingFn(
      {
        ratingId: existingRating._id,
        updatedData: {
          rating: rating,
          comment: comment,
        },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          refetchRating();
        },
      }
    );
  };

  const handleRatingDelete = () => {
    Alert.alert(
      "Delete Rating",
      "Are you sure you want to delete your rating? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            deleteRatingFn(existingRating._id, {
              onSuccess: () => {
                setRating(0);
                setComment("");
                setIsEditing(true);
                refetchRating();
              },
            });
          },
          style: "destructive",
        },
      ]
    );
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      // Reset to original values when entering edit mode
      setRating(existingRating?.rating || 0);
      setComment(existingRating?.comment || "");
    }
  };

  if (isLoadingRating) {
    return (
      <LinearGradient
        colors={["rgba(15, 23, 42, 0.65)", "rgba(30, 41, 59, 0.65)"]}
        className="mt-6 rounded-3xl p-5 mb-4 border border-[#d2af84]/20"
      >
        <View className="items-center justify-center py-4">
          <Text className="text-white">Loading your rating...</Text>
        </View>
      </LinearGradient>
    );
  }

  // If user has already rated and not in edit mode, show the rating with update/delete options
  if (existingRating && !isEditing) {
    return (
      <LinearGradient
        colors={["rgba(15, 23, 42, 0.65)", "rgba(30, 41, 59, 0.65)"]}
        className="mt-6 rounded-3xl overflow-hidden mb-4 border border-[#d2af84]/20"
      >
        <View className="p-5">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <AntDesign name="star" size={20} color="#d2af84" />
              <Text className="text-[#d2af84] text-lg font-bold ml-2">
                Your Rating
              </Text>
            </View>
            <View className="flex-row">
              <TouchableOpacity
                onPress={toggleEdit}
                className="bg-[#d2af84]/10 p-2 rounded-full mr-2"
              >
                <Feather name="edit-2" size={16} color="#d2af84" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleRatingDelete}
                className="bg-red-500/10 p-2 rounded-full"
                disabled={isDeleting}
              >
                <MaterialIcons
                  name="delete-outline"
                  size={16}
                  color="#EF4444"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Display the static rating */}
          <View className="bg-black/20 p-4 rounded-xl border border-[#d2af84]/20">
            <View className="flex-row mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <AntDesign
                  key={star}
                  name={star <= existingRating.rating ? "star" : "staro"}
                  size={24}
                  color={star <= existingRating.rating ? "#d2af84" : "#64748b"}
                  style={{ marginRight: 4 }}
                />
              ))}
              <Text className="text-white ml-2">
                {new Date(existingRating.createdAt).toLocaleDateString()}
              </Text>
            </View>

            {existingRating.comment && (
              <Text className="text-gray-300 mt-1">
                {existingRating.comment}
              </Text>
            )}
          </View>

          {isDeleting && (
            <View className="mt-3 bg-red-900/20 p-2 rounded-lg">
              <Text className="text-red-400 text-center">
                Deleting your rating...
              </Text>
            </View>
          )}
        </View>
      </LinearGradient>
    );
  }

  // For new rating OR editing existing rating
  return (
    <LinearGradient
      colors={["rgba(15, 23, 42, 0.65)", "rgba(30, 41, 59, 0.65)"]}
      className="mt-6 rounded-3xl overflow-hidden mb-4 border border-[#d2af84]/20"
    >
      <View className="p-5">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <AntDesign name="star" size={20} color="#d2af84" />
            <Text className="text-[#d2af84] text-lg font-bold ml-2">
              {existingRating
                ? "Edit Your Rating"
                : `Rate Your Stay at ${cabinName}`}
            </Text>
          </View>
          {existingRating && (
            <TouchableOpacity
              onPress={toggleEdit}
              className="bg-gray-700/50 p-1.5 px-3 rounded-full"
            >
              <Text className="text-gray-300 text-xs">Cancel</Text>
            </TouchableOpacity>
          )}
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
                color={star <= rating ? "#d2af84" : "#64748b"}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Comment Input */}
        <Text className="text-white text-base mb-2">
          Your Review (Optional)
        </Text>
        <TextInput
          className="bg-black/30 rounded-xl p-4 text-white text-base border border-[#d2af84]/30 mb-4"
          placeholder="Share your experience..."
          placeholderTextColor="#94A3B8"
          value={comment}
          onChangeText={setComment}
          multiline={true}
          numberOfLines={3}
          style={{ textAlignVertical: "top" }}
        />

        {/* Submit/Update Button */}
        <TouchableOpacity
          className={`rounded-xl py-3 px-6 ${
            rating > 0 ? "bg-[#d2af84]" : "bg-gray-600/70"
          }`}
          onPress={() => {
            if (existingRating && isEditing) {
              handleRatingUpdate();
            } else if (!existingRating) {
              handleRatingSubmit();
            } else {
              setIsEditing(true);
            }
          }}
          disabled={rating === 0 || isSubmitting || isUpdating}
        >
          <Text
            className={`text-center font-bold ${
              rating > 0 ? "text-[#23272f]" : "text-gray-400"
            }`}
          >
            {isSubmitting || isUpdating
              ? existingRating && isEditing
                ? "Updating..."
                : "Submitting..."
              : existingRating && isEditing
              ? "Update Rating"
              : existingRating
              ? "Edit Rating"
              : "Submit Rating"}
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

export default RatingSection;
