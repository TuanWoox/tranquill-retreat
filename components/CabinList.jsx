import { FlatList } from "react-native";
import CabinCard from "./CabinCard";
function CabinList({ cabins }) {
  return (
    <FlatList
      data={cabins.cabins}
      renderItem={({ item }) => <CabinCard cabin={item} />}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{
        gap: 20,
        paddingRight: 5,
        marginBottom: 30,
        paddingBottom: 32,
      }}
      className="mt-2"
      scrollEnabled={false}
    />
  );
}

export default CabinList;
