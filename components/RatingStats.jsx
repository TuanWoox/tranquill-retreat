import React from "react";
import { View, Text } from "react-native";
import { useCabinRatingsFormatted } from "@/hooks/useGetCabinRatings";
import Spinner from "./Spinner";

function RatingStats({ cabinId }) {
  const { data, isLoading } = useCabinRatingsFormatted(cabinId);

  if (isLoading) return <Spinner />;

  return (
    <View>
      <Text className="text-[#d2af84] text-base font-medium mb-2">
        Rating Distribution
      </Text>

      {/* Rating distribution bars */}
      {Object.entries(data?.ratingDistribution || {})
        .reverse()
        .map(([stars, count]) => (
          <View key={stars} className="flex-row items-center mb-2">
            <Text className="text-gray-300 w-8">{stars} ★</Text>
            <View className="flex-1 bg-black/40 mx-2 h-2 rounded border border-[#d2af84]/10">
              <View
                className="bg-[#d2af84] h-2 rounded"
                style={{
                  width:
                    data.totalRatings > 0
                      ? `${(count / data.totalRatings) * 100}%`
                      : "0%",
                }}
              />
            </View>
            <Text className="text-gray-400 w-8 text-right">{count}</Text>
          </View>
        ))}
    </View>
  );
}

export default RatingStats;
