import {
  ImageBackground,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { useCabins } from "../../hooks/useCabins";
import Spinner from "@/components/Spinner";
import CabinList from "@/components/CabinList";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { CabinSorter } from "@/patterns/strategy/sortStrategies";
import { SortByNameAsc } from "@/patterns/strategy/concreateStrategies";
import SortFactory from "@/patterns/factory/factoryPattern";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";

// Initialize sorter with default strategy
const sorter = new CabinSorter(new SortByNameAsc());
const sortFactory = new SortFactory();

const SORT_OPTIONS = [
  { key: "nameAsc", label: "Name (A-Z)" },
  { key: "nameDesc", label: "Name (Z-A)" },
  { key: "priceAsc", label: "Price (Low to High)" },
  { key: "priceDesc", label: "Price (High to Low)" },
  { key: "capacityAsc", label: "Capacity (Low to High)" },
  { key: "capacityDesc", label: "Capacity (High to Low)" },
  { key: "discountDesc", label: "Best Deals" },
  { key: "discountAsc", label: "Least Discounts" },
];

export default function Index() {
  const { cabins, isCabinsLoading } = useCabins();
  const { user: userInfo } = useAuthContext();
  const role = userInfo?.role || "";
  const displayName = userInfo?.fullName || "Visitor";
  const router = useRouter();

  const [sortedCabins, setSortedCabins] = useState([]);
  const [currentSortType, setCurrentSortType] = useState("nameAsc");
  const [showSortPicker, setShowSortPicker] = useState(false);

  useEffect(() => {
    if (!isCabinsLoading && cabins) {
      try {
        const strategy = sortFactory.getSort(currentSortType);
        sorter.setStrategy(strategy);
        setSortedCabins(sorter.sort(cabins));
      } catch (error) {
        console.error("Sorting error:", error);
        Alert.alert("Error", "Failed to sort cabins");
      }
    }
  }, [cabins, isCabinsLoading, currentSortType]);

  const handleSortChange = (sortType) => {
    try {
      setCurrentSortType(sortType);
      const strategy = sortFactory.getSort(sortType);
      sorter.setStrategy(strategy);
      setSortedCabins(sorter.sort(cabins));
      setShowSortPicker(false);
    } catch (error) {
      console.error("Sort change error:", error);
      Alert.alert("Error", "Failed to change sort order");
    }
  };

  const getCurrentSortLabel = () => {
    const currentOption = SORT_OPTIONS.find(
      (option) => option.key === currentSortType
    );
    return currentOption ? currentOption.label : "Name (A-Z)";
  };

  return (
    <ImageBackground
      source={require("../../assets/images/aboutBackground.jpg")}
      className="flex-1"
      blurRadius={3}
      style={{ resizeMode: "cover" }}
    >
      {/* Overlay for readability */}
      <View className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />

      <SafeAreaView className="flex-1">
        <ScrollView
          contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Card */}
          <View className="max-w-lg bg-black/70 border border-[#d2af84]/40 p-6 rounded-3xl mt-12 mx-6 shadow-2xl">
            <Text className="text-3xl font-extrabold text-[#d2af84] mb-2 tracking-wide drop-shadow-lg">
              Welcome
            </Text>
            <Text className="text-lg font-semibold text-white mb-1">
              {displayName}
            </Text>
            <Text className="text-white/70 text-base">
              Discover your perfect luxury cabin getaway.
            </Text>
          </View>

          {/* Main Section */}
          <View className="mt-6 p-6">
            <Text className="text-3xl text-[#d2af84] font-bold mb-2 drop-shadow-lg">
              Our Luxury Cabins
            </Text>

            {/* Sort Picker */}
            <View className="my-4">
              <Text className="text-[#d2af84] font-medium mb-2">Sort by:</Text>
              <TouchableOpacity
                onPress={() => setShowSortPicker(true)}
                className="bg-[#d2af84] px-4 py-3 rounded-lg flex-row justify-between items-center shadow"
                activeOpacity={0.9}
              >
                <Text className="text-black font-medium">
                  {getCurrentSortLabel()}
                </Text>
                <AntDesign name="down" size={18} color="#181b20" />
              </TouchableOpacity>
            </View>

            {/* Sort Options Modal */}
            <Modal
              visible={showSortPicker}
              transparent={true}
              animationType="fade"
              onRequestClose={() => setShowSortPicker(false)}
            >
              <TouchableOpacity
                className="flex-1 bg-black/60 justify-center items-center"
                activeOpacity={1}
                onPress={() => setShowSortPicker(false)}
              >
                <View className="bg-white rounded-2xl mx-6 max-w-sm w-full shadow-2xl">
                  <View className="p-4 border-b border-gray-200">
                    <Text className="text-lg font-bold text-center text-gray-800">
                      Sort Options
                    </Text>
                  </View>

                  <ScrollView className="max-h-80">
                    {SORT_OPTIONS.map((option) => (
                      <TouchableOpacity
                        key={option.key}
                        onPress={() => handleSortChange(option.key)}
                        className={`px-4 py-3 border-b border-gray-100 ${
                          currentSortType === option.key
                            ? "bg-[#d2af84]/20"
                            : ""
                        }`}
                      >
                        <Text
                          className={`text-gray-800 ${
                            currentSortType === option.key
                              ? "font-bold"
                              : "font-medium"
                          }`}
                        >
                          {option.label}
                          {currentSortType === option.key && " ✓"}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>

                  <TouchableOpacity
                    onPress={() => setShowSortPicker(false)}
                    className="p-4 border-t border-gray-200"
                  >
                    <Text className="text-center text-gray-600 font-medium">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Modal>

            {/* Admin Create Button */}
            {role === "admin" && (
              <TouchableOpacity
                onPress={() => router.push("/cabins/admin/create")}
                className="bg-[#d2af84] px-4 py-2 rounded-xl self-start my-4 shadow"
                activeOpacity={0.9}
              >
                <Text className="text-black font-bold text-base flex-row items-center">
                  <AntDesign name="pluscircleo" size={18} color="#181b20" />{" "}
                  <Text className="ml-2">Create New Cabin</Text>
                </Text>
              </TouchableOpacity>
            )}

            {/* Cabin List */}
            {isCabinsLoading ? (
              <Spinner />
            ) : (
              <CabinList cabins={sortedCabins} role={role} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
