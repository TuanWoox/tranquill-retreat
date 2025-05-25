import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  useGetCabinRatings,
  useCabinRatingsFormatted,
} from "@/hooks/useGetCabinRatings";
import Spinner from "./Spinner";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import RatingStats from "./RatingStats";

function CabinRatings({ cabinId }) {
  const { data, isLoading, error } = useCabinRatingsFormatted(cabinId);
  const [expanded, setExpanded] = useState(false);
  const [showStats, setShowStats] = useState(false);
  if (isLoading) return <Spinner />;

  // Get the 3 most recent ratings if not expanded
  const ratingsToShow = expanded
    ? data?.individualRatings
    : data?.individualRatings?.slice(0, 3);

  // Toggle expanded view
  const toggleExpanded = () => setExpanded(!expanded);

  // Toggle stats view
  const toggleStats = () => setShowStats(!showStats);

  // Styled container that matches your app's visual design with more transparency
  return (
    <LinearGradient
      colors={["rgba(15, 23, 42, 0.65)", "rgba(30, 41, 59, 0.65)"]}
      className="mt-6 rounded-3xl overflow-hidden shadow-lg border border-[#d2af84]/20"
    >
      <View className="p-5">
        <Text className="text-2xl font-bold text-[#d2af84] mb-2">
          Guest Reviews
        </Text>

        {error ? (
          <View className="p-4 bg-red-900/10 rounded-xl my-2 border border-red-900/20">
            <Text className="text-red-400 text-center">
              Failed to load ratings: {error?.message || "Unknown error"}
            </Text>
          </View>
        ) : !data || data.totalRatings === 0 ? (
          <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <Text className="text-2xl font-bold text-[#d2af84] mr-2">
                0.0
              </Text>
              <Text className="text-[#d2af84] text-lg">★</Text>
            </View>
            <Text className="text-gray-400">(0 reviews)</Text>
          </View>
        ) : (
          <>
            {/* Rating summary section */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <Text className="text-2xl font-bold text-[#d2af84] mr-2">
                  {data.averageRating.toFixed(1)}
                </Text>
                <Text className="text-[#d2af84] text-lg">★</Text>
              </View>
              <View className="flex-row items-center">
                <Text className="text-gray-300">
                  ({data.totalRatings}{" "}
                  {data.totalRatings === 1 ? "review" : "reviews"})
                </Text>

                {/* Toggle stats button */}
                <TouchableOpacity
                  onPress={toggleStats}
                  className="ml-2 bg-[#d2af84]/10 p-1 rounded-full"
                >
                  <AntDesign
                    name={showStats ? "infocirlceo" : "infocirlce"}
                    size={16}
                    color="#d2af84"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Show rating stats if toggled */}
            {showStats && (
              <View className="mb-4 bg-black/20 p-3 rounded-xl border border-[#d2af84]/10">
                <RatingStats cabinId={cabinId} />
              </View>
            )}

            {/* Individual ratings section */}
            {ratingsToShow?.map((rating) => (
              <View
                key={rating.id || `rating-${Math.random()}`}
                className="bg-black/20 p-4 mb-3 rounded-xl border border-[#d2af84]/20"
              >
                <View className="flex-row items-center mb-1">
                  <Text className="font-bold text-white">
                    {rating.userFullName || "Anonymous"}
                  </Text>
                  <Text className="text-gray-400 text-xs ml-auto">
                    {new Date(rating.createdAt).toLocaleDateString()}
                  </Text>
                </View>

                <View className="flex-row items-center mb-2">
                  <Text className="text-[#d2af84]">
                    {"★".repeat(rating.rating)}
                    {"☆".repeat(5 - rating.rating)}
                  </Text>
                </View>

                {rating.comment && (
                  <Text className="text-gray-300">{rating.comment}</Text>
                )}

                {/* Safe rendering for stayPeriod with checks */}
                {rating.stayPeriod && (
                  <Text className="text-gray-500 text-xs mt-2">
                    Stayed:{" "}
                    {new Date(rating.stayPeriod.startDate).toLocaleDateString()}{" "}
                    - {new Date(rating.stayPeriod.endDate).toLocaleDateString()}
                  </Text>
                )}
              </View>
            ))}

            {/* "View More" button - only show if there are more than 3 ratings */}
            {data.individualRatings?.length > 3 && (
              <TouchableOpacity
                onPress={toggleExpanded}
                className="bg-[#d2af84]/10 py-3 px-4 rounded-lg mt-2 border border-[#d2af84]/20"
              >
                <Text className="text-[#d2af84] text-center font-medium">
                  {expanded
                    ? "Show Less"
                    : `View All ${data.totalRatings} Reviews`}
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </View>
    </LinearGradient>
  );
}

export default CabinRatings;
