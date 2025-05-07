import { FlatList } from "react-native";
import CabinCard from "./CabinCard";
function CabinList({ cabins }) {
  return (
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
  );
}

export default CabinList;
