import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { useGetSetting } from "@/hooks/useGetSetting";
import Spinner from "@/components/Spinner";
import { useGetOneCabin } from "@/hooks/useGetOneCabin";
import CabinDetails from "@/components/CabinDetails";
import NotFoundCard from "@/components/NotFoundCard";

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
      <NotFoundCard
        title="Cabin Not Found"
        message="Sorry, we couldn't find the cabin you're looking for."
        suggestion="Please check the link or try again later."
        error={getError}
      />
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
