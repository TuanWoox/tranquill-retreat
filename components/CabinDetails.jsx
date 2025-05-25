import { ScrollView, Text } from "react-native";
import CabinHero from "./CabinHero";
import Spinner from "./Spinner";
import Reservation from "./Reservation";
import CabinRatings from "./CabinRatings";

function CabinDetails({ cabin, settings, isLoading }) {
  return (
    <ScrollView
      className="flex-1 bg-transparent"
      contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
    >
      {/* Render cabin details */}
      <CabinHero cabin={cabin} />
      <Text className="text-2xl font-bold text-center text-[#d2af84] my-4">
        Reserve {cabin?.name || "this cabin"} today. Pay on arrival.
      </Text>
      <Reservation cabin={cabin} settings={settings} />

      <CabinRatings cabinId={cabin?._id} />
    </ScrollView>
  );
}

export default CabinDetails;
