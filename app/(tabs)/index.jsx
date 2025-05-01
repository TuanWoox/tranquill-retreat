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
import { useAuthSession } from "../../hooks/useAuthSession";
export default function Index() {
  const { cabins, isCabinsLoading, cabinsError } = useCabins();
  const { userInfo, session, userInfoLoading } = useAuthSession();
  const greetingText = session
    ? userInfoLoading
      ? "Loading your info..."
      : `Welcome back ${userInfo?.fullName ?? "User"}`
    : "Welcome, Visitor!";
  return (
    <ImageBackground
      source={require("../../assets/images/aboutBackground.jpg")}
      className="flex-1"
    >
      {/* Dark overlay for better text readability */}
      <View className="absolute inset-0 bg-[rgb(20,28,36)] opacity-70" />

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
            {greetingText}
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
