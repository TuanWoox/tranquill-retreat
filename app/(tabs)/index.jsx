import { FlatList, ScrollView, Text, View } from "react-native";
import { useCabins } from "../../hooks/useCabins";
import Spinner from "@/components/Spinner";
import CabinCard from "@/components/CabinCard";

export default function Index() {
  const { cabins, isCabinsLoading, cabinsError } = useCabins();
  return (
    <ScrollView
      contentContainerStyle={{
        minHeight: "100%",
        paddingBottom: 10,
        backgroundColor: "rgb(20,28,36)",
      }}
    >
      <View className="max-w-lg bg-[#72716e] p-6 border-2 border-[#524d4d] rounded-xl mt-12 mx-10 shadow-md">
        <Text className="text-3xl font-semibold text-[#312e2b] mb-4">
          Hello There
        </Text>
        <Text className="text-lg font-semibold text-white">
          Welcome, Visitor!
        </Text>
      </View>
      <View className="mt-2 p-6">
        <Text className="text-3xl text-[#d2af84] font-bold">
          Our Luxry Cabins
        </Text>
        <Text className="text-lg text-slate-300 font-medium">
          Luxurious cabins in the Da Lat City. Enjoy stunning mountain views,
          explore forests, or relax in your private hot tub. Your perfect escape
          awaits.
        </Text>
        {isCabinsLoading ? (
          <Spinner />
        ) : (
          <FlatList
            data={cabins}
            renderItem={({ item }) => <CabinCard cabin={item} />}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{
              gap: 20,
              paddingRight: 5,
              marginBottom: 30,
              paddingBottom: 32,
            }}
            className="mt-2"
            scrollEnabled={false}
          />
        )}
      </View>
    </ScrollView>
  );
}
