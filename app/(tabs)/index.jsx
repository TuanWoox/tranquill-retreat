import {
  FlatList,
  ScrollView,
  Text,
  View,
  ImageBackground,
} from "react-native";
import { useCabins } from "../../hooks/useCabins";
import Spinner from "@/components/Spinner";
import CabinList from "@/components/CabinList";
import { useGetInformation } from "@/hooks/useGetInformation";

export default function Index() {
  const { cabins, isCabinsLoading, cabinsError } = useCabins();
  const { userInfo, isLoading: userInfoLoading, error } = useGetInformation();

  // Determine the username to display - if logged in show fullname, otherwise show "Visitor"
  const displayName =
    userInfo && userInfo.foundUser?.fullName
      ? userInfo.foundUser?.fullName
      : "Visitor";

  return (
    <ImageBackground
      source={require("../../assets/images/aboutBackground.jpg")}
      style={{ width: "100%", height: "100%" }}
      resizeMode="cover"
    >
      {/* Dark overlay for better text readability */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(20,28,36,0.7)",
        }}
      />

      <ScrollView
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
        }}
      >
        <View className="max-w-lg bg-[#72716e] p-6 border-2 border-[#524d4d] rounded-xl mt-12 mx-10 shadow-md">
          <Text className="text-3xl font-semibold text-[#312e2b] mb-4">
            Hello There
          </Text>
          <Text className="text-lg font-semibold text-white">
            {displayName}
          </Text>
        </View>
        <View className="mt-2 p-6">
          <Text className="text-3xl text-[#d2af84] font-bold">
            Our Luxury Cabins
          </Text>
          <Text className="text-lg text-slate-300 font-medium">
            Luxurious cabins in the Da Lat City. Enjoy stunning mountain views,
            explore forests, or relax in your private hot tub. Your perfect
            escape awaits.
          </Text>
          {isCabinsLoading ? <Spinner /> : <CabinList cabins={cabins} />}
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
