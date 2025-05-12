import { Text, TouchableOpacity } from "react-native";

function ButtonAuthTab({ children, handlePress }) {
  return (
    <TouchableOpacity
      className="w-full bg-[#d2af84] px-4 py-3 rounded-md mt-3"
      onPress={handlePress}
    >
      <Text className="text-black text-center font-semibold">{children}</Text>
    </TouchableOpacity>
  );
}

export default ButtonAuthTab;
