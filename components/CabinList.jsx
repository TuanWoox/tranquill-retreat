import { FlatList } from "react-native";
import CabinCard from "./CabinCard";
import AdminCabinCard from "./AdminCabinCard"; // import AdminCabinCard

function CabinList({ cabins, role }) {
  const isAdmin = role === "admin";

  return (
    <FlatList
      data={cabins}
      renderItem={({ item }) =>
        isAdmin ? <AdminCabinCard cabin={item} /> : <CabinCard cabin={item} />
      }
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
