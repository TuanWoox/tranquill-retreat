import React from "react";
import { ScrollView, View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Cabin from "@/components/CabinHero";
import Reservation from "@/components/Reservation";
import CabinSpinner from "@/components/CabinSpinner";
import { useGetSetting } from "@/hooks/useGetSetting";
import Spinner from "@/components/Spinner";
import { useGetOneCabin } from "@/hooks/useGetOneCabin";
import CabinDetails from "@/components/CabinDetails";

export default function CabinDetailPage() {
  const { cabinId } = useLocalSearchParams();

  const {
    data: cabin,
    isLoading: isGettingCabin,
    error: getError,
  } = useGetOneCabin(cabinId);

  const {
    data: settings,
    isLoading: isLoadingSettings,
    error,
  } = useGetSetting();

  const isLoading = isGettingCabin || isLoadingSettings;
  // Show error if cabin fetch failed or cabin not found
  if (getError || (!cabin && !isGettingCabin)) {
    return (
      <View className="flex-1 justify-center items-center px-5">
        <Text className="text-red-500 text-base text-center">
          {getError ? getError.message : "Cabin not found."}
        </Text>
      </View>
    );
  }

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <CabinDetails cabin={cabin} settings={settings} />
      )}
    </>
  );
}
